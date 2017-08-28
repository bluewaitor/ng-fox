import {NgFoxModule} from '../components/ng-fox.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgFoxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
