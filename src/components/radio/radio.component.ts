import {Component, ElementRef,AfterContentInit, HostListener, Input, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {FoxRadioGroupComponent} from './radio-group.component';

@Component({
  selector: '[fox-radio]',
  templateUrl: 'radio.component.html',
  styleUrls: ['radio.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FoxRadioComponent implements OnInit, AfterContentInit {

  _el: HTMLElement;
  _value: string;
  _checked = false;
  _disabled = false;
  _classList = '';
  _foxRadioClass = 'fox-radio';

  @Input()
  get foxValue() {
    return this._value;
  }

  set foxValue(value) {
    if (this._value === value) {
      return;
    }
    this._value = value;
    this._setClassList();
  }

  @Input()
  get foxChecked() {
    return this._checked;
  }

  set foxChecked(value) {
    console.log(value);
    this._checked = value;
    this._setClassList();
  }

  @Input()
  get foxDisabled() {
    return this._disabled;
  }

  set foxDisabled(value) {
    this._disabled = value;
    this._setClassList();
  }

  @HostListener('click', ['$event'])
  _onClick(e) {
    e.preventDefault();
    if (!this.foxDisabled) {
      this.foxChecked = true;
      this._foxRadioGroup.selectRadio(this);
    }
  }

  @Input('class')
  get classList() {
    return this._classList;
  }

  set classList(value) {
    this._classList = value;
  }

  _setClassList() {
    const _classList = this.classList.split(' ');
    // 去除所有的类样式
    this._renderer.setAttribute(this._el, 'class', '');

    _classList.push(`${this._foxRadioClass}`);
    // _classList.push(`${this._foxRadioClass}-${this.foxType}`);
    if (this.foxChecked) {
      _classList.push(`${this._foxRadioClass}-checked`);
    }
    if (this.foxDisabled) {
      _classList.push(`${this._foxRadioClass}-disabled`);
    }
    _classList.forEach(_className => {
      if (_className) {
        this._renderer.addClass(this._el, _className);
      }
    });

  }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2, private _foxRadioGroup: FoxRadioGroupComponent) {
    this._el = this._elementRef.nativeElement;
    this._foxRadioGroup.addRadio(this);
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this._setClassList();
  }
}
