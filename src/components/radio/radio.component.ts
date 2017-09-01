import {Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {FoxRadioGroupComponent} from './radio-group.component';

@Component({
  selector: '[fox-radio]',
  templateUrl: 'radio.component.html',
  styleUrls: ['radio.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FoxRadioComponent implements OnInit {

  _el: HTMLElement;
  _value: string;
  _checked = false;
  _disabled = false;

  @Input()
  get foxValue() {
    return this._value;
  }

  set foxValue(value) {
    if (this._value === value) {
      return;
    }
    this._value = value;
  }

  @Input()
  get foxChecked() {
    return this._checked;
  }

  set foxChecked(value) {
    this._checked = value;
  }

  @Input()
  get foxDisabled() {
    return this._disabled;
  }

  set foxDisabled(value) {
    this._disabled = value;
  }

  @HostListener('click', ['$event'])
  _onClick(e) {
    e.preventDefault();
    if (!this.foxDisabled) {
      this.foxChecked = true;
      this._foxRadioGroup.selectRadio(this);
    }
  }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2, private _foxRadioGroup: FoxRadioGroupComponent) {
    this._el = this._elementRef.nativeElement;

  }

  ngOnInit() {
  }

}
