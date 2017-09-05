const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const sass = require('node-sass');

let copyPath = path.join(__dirname, 'src', '__components__');
let stylesRegex = /styleUrls *:(\s*\[[^\]]*?\])/g;
let stringRegex = /(['"])((?:[^\\]\\\1|.)*?)\1/g;
let sassNumRegex = /style_(\d+)_sass/g;
let sassFilePool = [];
let handledSassFileCount = 0;

fsExtra.removeSync('./src/release');

fsExtra
  .copy('./src/components', './src/__components__')
  .then(() => {

    getTsFile(copyPath, transformStyleUrls);

    handledSassFileCount = 0;

    let index = 0;
    while (index < sassFilePool.length) {
      (function (index) {
        // debugger
        fs.readFile(sassFilePool[index], function (e, data) {
          sass.render({
            file: sassFilePool[index]
          }, function (e, output) {
            sassFilePool[index] = output.css.toString().replace(/\\e/g, function (match, e) {
              // 对content中的类似'\e630'中的\e进行处理
              return '\\\\e';
            }).replace(/\\E/g, function (match, e) {
              // 对content中的类似'\E630'中的\E进行处理
              return '\\\\E';
            }).replace(/\\20/g, function (match, e) {
              // 对content中的类似'\20'中的\20进行处理
              return '\\\\20';
            }).replace(/`/g, function (match, e) {
              // 处理css中`符号
              return "'";
            });
            doneOne();
          })
        })
      })(index);
      index += 1
    }
  }).catch(e => {
    console.error(e);
  });

// 获取 ts 格式的文件
function getTsFile(filePath, parse) {
  try {
    if (fs.statSync(filePath).isFile() && /\.ts$/.test(filePath)) {
      parse(filePath)
    } else if (fs.statSync(filePath).isDirectory()) {
      let paths = fs.readdirSync(filePath);
      paths.forEach(function (p) {
        getTsFile(path.join(filePath, p), parse);
      })
    }
  } catch (err) {
    throw err;
  }
}

//
function transformStyleUrls(filePath) {
  let content = fs.readFileSync(filePath);
  if (stylesRegex.test(content)) {
    let contentTemp = content.toString().replace(stylesRegex, function (match, urls) {
      return "styles:" + urls.replace(stringRegex, function (match, quote, url) {
          sassFilePool.push(path.resolve(path.dirname(filePath), url));
          let result = 'style_' + handledSassFileCount + '_sass';
          handledSassFileCount += 1;
          return result;
        })
    });
    fs.writeFileSync(filePath, contentTemp);
  }
}


function doneOne() {
  handledSassFileCount += 1;
  // 说明所有处理完成。
  if (handledSassFileCount === sassFilePool.length) {
    writeBack();
  }
}


function writeBack() {
  console.log("start to write back");
  getTsFile(copyPath, writeBackCss);
  console.log('Done');
}

function writeBackCss(path) {
  let content = fs.readFileSync(path);
  if (sassNumRegex.test(content)) {
    let contentTemp = content.toString().replace(sassNumRegex, function (match, index) {
      return '`' + sassFilePool[index] + '`';
    });
    fs.writeFileSync(path, contentTemp);
  }
}
