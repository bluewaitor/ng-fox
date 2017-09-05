import {
  AfterContentInit, Component, ElementRef, HostListener, Input, Renderer2,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: '[fox-button]',
  template: `
    <span><ng-content></ng-content></span>
  `,
  styleUrls: ['button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FoxButtonComponent implements AfterContentInit {
  _el: HTMLElement;
  _clicked: boolean;
  _type: 'primary';
  _size: 'default';
  _shape: string;
  _classList: string;
  _foxBtnClass = 'fox-btn';

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    this._el = this._elementRef.nativeElement;
    this._renderer.addClass(this._el, this._foxBtnClass);
  }

  @Input()
  get foxType() {
    return this._type;
  }

  set foxType(type) {
    this._type = type;
  }

  @Input()
  get foxSize() {
    return this._size;
  }

  set foxSize(value) {
    this._size = value;
  }

  @Input()
  get foxShape() {
    return this._shape;
  }

  set foxShape(value) {
    this._shape = value;
  }

  @Input('class')
  get classList() {
    return this._classList;
  }

  set classList(value) {
    this._classList = value;
  }

  ngAfterContentInit() {
    this._setClassList();
  }

  @HostListener('click')
  _onClick() {
    this._clicked = true;
    this._setClassList();
    setTimeout(() => {
      this._clicked = false;
      this._setClassList();
    }, 300);
  }

  _setClassList() {
    const _classList = this.classList.split(' ');
    // 去除所有的类样式
    this._renderer.setAttribute(this._el, 'class', '');

    _classList.push(`${this._foxBtnClass}`);
    _classList.push(`${this._foxBtnClass}-${this.foxType}`);
    if (this._clicked) {
      _classList.push(`${this._foxBtnClass}-clicked`);
    }

    if (this.foxSize) {
      _classList.push(`${this._foxBtnClass}-${this.foxSize}`);
    }

    if (this.foxShape) {
      _classList.push(`${this._foxBtnClass}-${this.foxShape}`);
    }

    _classList.forEach(_className => {
      if (_className) {
        this._renderer.addClass(this._el, _className);
      }
    });

  }
}
