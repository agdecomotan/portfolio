import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';

import {AppComponent} from './app.component';
import {LandingComponent} from './landing/landing.component';

import {HttpClientModule} from '@angular/common/http';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
      AppComponent,
      LandingComponent,
  ],
  imports: [
      BrowserModule,
      HttpClientModule ,
      NgbModule.forRoot(),
      FormsModule,
      RouterModule,
      AppRoutingModule,
      NgxDatatableModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
