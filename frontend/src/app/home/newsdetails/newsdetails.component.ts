import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { HttpService } from "../../http.service";
import { FormsModule, ReactiveFormsModule,FormBuilder, FormGroup, FormControl,  Validators } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { AlertsService } from 'angular-alert-module';
import {User} from "../../user.model";

@Component({
  selector: 'app-newsdetails',
  templateUrl: './newsdetails.component.html',
  styleUrls: ['./newsdetails.component.css']
})
export class NewsdetailsComponent implements OnInit {

  constructor(public httpService: HttpService,
  private router: Router,
    private route: ActivatedRoute,
    private alerts: AlertsService) { }

    public title=''
    public description=''
    public newsimg=''
  ngOnInit(): void {

this.httpService.getCurrentData(this.route.snapshot.params.id)
        .subscribe((result)=>{
          console.log(this.route.snapshot.params.id)
          this.title=result[0].title,
         this.description=result[0].description,
           this.newsimg=result[0].img,
          console.log(result[0].title,result[0].description,result[0].img)

})
}



}
