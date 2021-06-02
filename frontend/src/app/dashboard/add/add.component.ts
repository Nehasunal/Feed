import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { HttpService } from "../../http.service";
import { FormsModule, ReactiveFormsModule,FormBuilder, FormGroup, FormControl,  Validators } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { AlertsService } from 'angular-alert-module';
import { ImageCroppedEvent, base64ToFile} from 'ngx-image-cropper';
import {User} from "../../user.model";
import {mimetype} from "./mime-type.validator";
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
form: FormGroup;
  constructor(  public httpService: HttpService,
    private router: Router,
      private alerts: AlertsService,
      private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title:new FormControl(null, {validators:[Validators.required]}),
description:new FormControl(null, {validators:[Validators.required]}),
file:new FormControl(null, Validators.required)
  })}


get f() { return this.form.controls; }

imageChangedEvent: any = '';
croppedImage: any = '';
images;

selectImage(event) {

    this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {

      this.croppedImage = event.base64;
      const file= this.base64ToFile(
        event.base64,
        this.imageChangedEvent.target.files[0].name,
      )
       this.images =file;

  }

  base64ToFile(data, filename) {
  const arr = data.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);

  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}


  imageLoaded() {}

  cropperReady() {}

  loadImageFailed() {}




onSubmit(){

        const formData = new FormData();
    formData.append('title',  this.form.value.title);
    formData.append('description',  this.form.value.description);
     formData.append('file', this.images);
     console.log(formData);
    this.httpService
        .addUser(formData)
        .subscribe((data)=> {
       this.alerts.setMessage ('Data added ', 'success');
       // this.form.reset();
        },

        err => {

                this.alerts.setMessage ('title already exist ', 'error');
              });
this.form.reset();
  }

goBack(){
  this.router.navigateByUrl('/dashboard');
}



}
