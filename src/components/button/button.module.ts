import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoxButtonComponent } from './button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FoxButtonComponent],
  exports: [FoxButtonComponent]
})
export class ButtonModule { }
