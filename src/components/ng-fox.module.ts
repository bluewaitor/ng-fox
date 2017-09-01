import {NgModule, ModuleWithProviders} from '@angular/core';

// import modules
import {ButtonModule} from './button/button.module';
import {RadioModule} from './radio/radio.module';


// export modules
export {ButtonModule} from './button/button.module';
export {RadioModule} from './radio/radio.module';


@NgModule({
  exports: [
    ButtonModule,
    RadioModule
  ]
})
export class NgFoxModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgFoxModule,
    };
  }
}

