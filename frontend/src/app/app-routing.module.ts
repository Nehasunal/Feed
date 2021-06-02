import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { NewsdetailsComponent } from './home/newsdetails/newsdetails.component';

import { AddComponent } from './dashboard/add/add.component';
import { EditComponent } from './dashboard/edit/edit.component';


const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
   { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'forgetpassword', component: ForgetpasswordComponent},
{ path: 'resetpassword', component: ResetpasswordComponent},
{ path: 'resetpassword/:id', component: ResetpasswordComponent},
{ path: 'edit/:id', component: EditComponent},
{path:'newsdetails/:id', component:NewsdetailsComponent },
{ path: 'add', component: AddComponent}

];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
