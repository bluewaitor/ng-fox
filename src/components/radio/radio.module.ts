import {NgModule} from '@angular/core';

import {FoxRadioComponent} from './radio.component';
import {CommonModule} from '@angular/common';
import {FoxRadioGroupComponent} from './radio-group.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [FoxRadioComponent, FoxRadioGroupComponent],
  declarations: [FoxRadioComponent, FoxRadioGroupComponent],
  providers: [],
})
export class RadioModule {
}
