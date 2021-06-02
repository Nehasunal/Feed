import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImageCropperModule } from 'ngx-image-cropper';

import { HttpClientModule } from '@angular/common/http';
import {HttpService} from './http.service';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AlertsModule } from 'angular-alert-module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination'
import { User } from './user.model';
import { AddComponent } from './dashboard/add/add.component';
import { EditComponent } from './dashboard/edit/edit.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewsdetailsComponent } from './home/newsdetails/newsdetails.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    AddComponent,
    EditComponent,
    HeaderComponent,
    NewsdetailsComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AlertsModule.forRoot(),
  ReactiveFormsModule,
  ImageCropperModule,
      HttpClientModule,
      NoopAnimationsModule,
        NgxPaginationModule,
        NgbModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
