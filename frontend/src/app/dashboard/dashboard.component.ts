import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormsModule,ReactiveFormsModule,FormBuilder, FormGroup, FormControl,  Validators } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { HttpService } from "../http.service";
import { User } from '../user.model';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public httpService: HttpService,
   private router: Router,
   private route: ActivatedRoute,
   private alerts: AlertsService) {}

public users=[];

public current={name:null, token:null};
name:string;
email='';

ngOnInit(): void {
   this.getNews();
}

getNews(){
  this.httpService.getNews()
 .subscribe
 (data=>{
   this.current=JSON.parse(localStorage.getItem('data'));
   console.log("name",this.current.name);

   this.name=this.current.name;


   console.log(this.users=data);
}
)}


 displayedColumns = ['title', 'description', 'image'];
///////////////////////SEARCH DATA///////
search='';
searchData(event) {
        this.search = event.target.value;

        console.log(this.search)

        this.httpService.searchData(this.search).subscribe((res) => {

          if (res) {
            console.log("res",res)
            this.users = res

          }
        },
          (err) => {
            console.log(err);
            console.log("error")
          })
      }
/////////////PAGINATION
pageSizes=[3,6,9,12,15]
p: number = 1;
limit: number = 3;
total: number;
getPage(pageNo: number) {
   this.p = pageNo;
   this.getUserspage(this.p);
 }
 getUserspage(p: number) {
   let offset = (p - 1) * this.limit;
   this.httpService.getUserspage(offset, this.limit).subscribe(
     result => {
    // this.users = result;
     }
   )
 }
pageSize(event){
  this.limit=event.target.value;
  this.p=1;
  this.getUserspage(this.p)
}
//////////////////////onLogout/////////////////
onLogout(){
    localStorage.removeItem('data');
  localStorage.removeItem('token');
  this.router.navigate(['/home']);

}


}//end
