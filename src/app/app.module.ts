import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';

import {AppComponent} from './app.component';
import {AdminComponent} from './admin/admin.component';
import {LandingComponent} from './landing/landing.component';
import {ProductListComponent} from './product-list/product-list.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {FooterComponent} from './shared/footer/footer.component';

import {HomeModule} from './home/home.module';
import {DbOperationsService} from './db-operations.service';
import {HttpClientModule} from '@angular/common/http';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {PhotosComponent} from './photos/photos.component';
import {DesignComponent} from './design/design.component';
import {AboutComponent} from './about/about.component';
import {RateComponent} from './rate/rate.component';
import {MessagesComponent} from './messages/messages.component';
import {RateListComponent} from './rate-list/rate-list.component';
import {AuthGuard} from './auth-guard';

@NgModule({
  declarations: [
      AppComponent,
      AdminComponent,
      LandingComponent,
      NavbarComponent,
      FooterComponent,
      PhotosComponent,
      DesignComponent,
      AboutComponent,
      RateComponent,
      ProductListComponent,
      MessagesComponent,
      RateListComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule ,
      NgbModule.forRoot(),
      FormsModule,
      RouterModule,
      AppRoutingModule,
      HomeModule,
      NgxDatatableModule
  ],
  providers: [DbOperationsService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
