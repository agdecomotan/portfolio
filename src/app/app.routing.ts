import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {ProductListComponent} from './product-list/product-list.component';
import {AdminComponent} from './admin/admin.component';
import {LandingComponent} from './landing/landing.component';
import {NucleoiconsComponent} from './components/nucleoicons/nucleoicons.component';
import {PhotosComponent} from './photos/photos.component';
import {DesignComponent} from './design/design.component';
import {AboutComponent} from './about/about.component';
import {RateComponent} from './rate/rate.component';
import {RateListComponent} from './rate-list/rate-list.component';
import {MessagesComponent} from './messages/messages.component';
import {AuthGuard} from './auth-guard';

const routes: Routes =[
    { path: 'home1', component: HomeComponent },
    { path: 'user-product-list', component: ProductListComponent },
    { path: 'nucleoicons', component: NucleoiconsComponent },

    { path: 'admin', component: AdminComponent },
    { path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard] },
    { path: 'rate-list', component: RateListComponent, canActivate: [AuthGuard] },
    { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },

    { path: '', component: LandingComponent },
    { path: 'about-us', component: AboutComponent },
    { path: 'photos',  component: PhotosComponent },
    { path: 'designs', component: DesignComponent },
    { path: 'rates', component: RateComponent },

    //{ path: '', redirectTo: 'home', pathMatch: 'full' }


];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
