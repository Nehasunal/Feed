import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule,FormBuilder, FormGroup, FormControl,  Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { AlertsService } from 'angular-alert-module';
import { HttpService } from "../http.service";
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
form:FormGroup;
//   password = new FormControl("", [
//   Validators.required,
// ]);
// cpassword = new FormControl("", [
//   Validators.required,
// ]);
  constructor(public httpService: HttpService,
  private router: Router,
    private route: ActivatedRoute,
  private alerts: AlertsService,) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'password':new FormControl(null, {validators:[Validators.required]}),

        'cpassword':new FormControl(null, {validators:[Validators.required]})
  })
  }
get f() { return this.form.controls; }
onSubmit(){
  let user = {
  password: this.form.value.password,
    cpassword: this.form.value.cpassword,
  }
  if(this.form.value.password===this.form.value.cpassword)
  {

      this.httpService.resetUser(this.route.snapshot.params.id,user).subscribe((res) => {
         console.log(res,"data updated");
       this.alerts.setMessage ('password Updated','success');
    
    },
    err => {

            this.alerts.setMessage ('Email or Password Invalid ', 'error');
          }
  )}
  else{
    this.alerts.setMessage ('Password doesnot match', 'error');
}
this.form.reset();

}



}
