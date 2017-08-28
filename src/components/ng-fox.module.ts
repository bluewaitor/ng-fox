import {NgModule, ModuleWithProviders} from '@angular/core';

// import modules

// export modules

@NgModule({
  exports: [

  ]
})
export class NgFoxModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgFoxModule,
    };
  }
}
