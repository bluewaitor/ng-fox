import { NgModule, ModuleWithProviders } from '@angular/core';

import { HelloModule } from './hello/hello.module';


export { HelloModule } from './hello/hello.module';

@NgModule({
    exports: [
        HelloModule
    ]
  })
  export class NgFoxModule {
  
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: NgFoxModule,
      };
    }
  }