import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { HttpService } from "../http.service";
import { FormsModule, ReactiveFormsModule,FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { AlertsService } from 'angular-alert-module';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {


  email = new FormControl("", [
        Validators.required,
        Validators.email
      ]);

  constructor(
    public httpService: HttpService,
    private router: Router,private alerts: AlertsService,
      private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

  Submit(){
    let user = {

          email: this.email.value,

        }
        this.httpService.sendEmail(user).subscribe(

    data => {
      let res:any = data;
      this.alerts.setMessage ('Mail has been sent','success');
      this.router.navigateByUrl('/login');

    },
    err => {
      console.log(err);
this.alerts.setMessage ('Something went wrong','error');
    },() => {

    }
        );

  }














}//end
