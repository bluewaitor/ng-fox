import {NgModule, ModuleWithProviders} from '@angular/core';

// import modules
import {ButtonModule} from './button/button.module';


// export modules
export {ButtonModule} from './button/button.module';


@NgModule({
  exports: [
    ButtonModule
  ]
})
export class NgFoxModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgFoxModule,
    };
  }
}

