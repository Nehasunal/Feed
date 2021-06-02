import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { HttpService } from "../http.service";
import { FormsModule, ReactiveFormsModule,FormBuilder, FormGroup, FormControl,  Validators } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl("", [
        Validators.required,
        Validators.email
      ]);

      password = new FormControl("", [
        Validators.required,

      ]);

  constructor(
    public httpService: HttpService,
    private router: Router,
      private alerts: AlertsService,
      private route: ActivatedRoute) { }

  ngOnInit(){

  }

public users:any;
onSubmit(){
  let user = {

        email: this.email.value,
        password: this.password.value
      }

      this.httpService.loginUser(user).subscribe( data=>{
        if(data){
            this.users=data;
  localStorage.setItem('data',JSON.stringify(this.users))
   localStorage.setItem('token', (this.users.token).toString())
            this.router.navigateByUrl('/dashboard');


          }
  },
  error=>{
      this.alerts.setMessage ( 'Invalid Email or Password','error');
  });
}


}//end
