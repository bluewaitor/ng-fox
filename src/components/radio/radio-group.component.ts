import {
  AfterContentInit, Component, ElementRef, forwardRef, HostListener, OnInit, Renderer2,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FoxRadioComponent} from "./radio.component";

@Component({
  selector: 'fox-radio-group',
  template: `
    <ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FoxRadioGroupComponent),
      multi: true
    }
  ],
  styleUrls: ['radio.component.scss'],
})
export class FoxRadioGroupComponent implements OnInit, AfterContentInit, ControlValueAccessor {

  _el: HTMLElement;
  // 内部的值
  _value;
  // 控件接受到change事件后, 执行的方法, 名字可以自己取, 值改变的时候触发这个函数
  onChange: (_: any) => {};
  // 控件接受到touch事件后, 执行的方法
  onTouched: () => {};

  _foxRadioGroupClass = 'fox-radio-group';
  _radios: (FoxRadioComponent)[] = [];



  addRadio(radio: FoxRadioComponent) {
    this._radios.push(radio);
  }

  selectRadio(radio: FoxRadioComponent) {
    this.updateValue(radio.foxValue);
    this.onChange(radio.foxValue);
  }



  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    this._el = this._elementRef.nativeElement;
    this._renderer.addClass(this._el, this._foxRadioGroupClass);
  }

  ngOnInit() {

  }

  ngAfterContentInit(): void {
    this._radios.forEach((radio) => {
      radio.foxChecked = radio.foxValue === this._value;
    });
    // throw new Error('Method not implemented.');
  }

  updateValue(value) {
    console.log(value);
    if (this._value === value) {
      return;
    }
    this._value = value;
    this._radios.forEach((radio) => {
      radio.foxChecked = radio.foxValue === this._value;
    });
  }


  // ngModel 将新值写进去
  writeValue(obj: any): void {
    this.updateValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // 此选项是可选的, 暂时不实现
    throw new Error('Method not implemented.');
  }


}
