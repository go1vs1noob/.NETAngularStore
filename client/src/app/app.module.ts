import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { TopNavbarModule } from './top-navbar/top-navbar.module';
import { ContactModule } from './contact/contact.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [

    RouterModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    TopNavbarModule,
    ContactModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
