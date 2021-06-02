import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { HttpService } from "../../http.service";
import { FormsModule, ReactiveFormsModule,FormBuilder, FormGroup, FormControl,  Validators } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { AlertsService } from 'angular-alert-module';
import { ImageCroppedEvent, base64ToFile} from 'ngx-image-cropper';
import {User} from "../../user.model";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editEmp:FormGroup;

    constructor(private formBuilder: FormBuilder,
      public httpService: HttpService,
      private router: Router,
        private route: ActivatedRoute,
        private alerts: AlertsService,
  ) { }


     imageChangedEvent: any = '';
     croppedImage: any = '';
     images;



    ngOnInit(): void {

        this.editEmp= this.formBuilder.group({
        id:[''],
        title:['',[Validators.required]],
        description:['',Validators.required],
        file:['',Validators.required]
        })
  this.httpService.getCurrentData(this.route.snapshot.params.id)
          .subscribe((result)=>{
            console.log(this.route.snapshot.params.id)

          this.editEmp= this.formBuilder.group({

          title:[result[0].title],
          description:[result[0].description],
          file:[result[0].img]
})
// console.log(result[0].img)
  this.croppedImage=[result[0].img]

          })

    }//ng
   get f() { return this.editEmp.controls; }


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


    updateUser(){
      const formData = new FormData();
  formData.append('title',  this.editEmp.value.title);
  formData.append('description',  this.editEmp.value.description);
   formData.append('file', this.images);
      console.log(formData);
      this.httpService.updateUser(this.route.snapshot.params.id,formData)
  .subscribe((result)=>{
        console.log(result,"data updated");
    this.alerts.setMessage ('Data updated ', 'success');
      },err => {

              this.alerts.setMessage ('Something went wrong ', 'error');
            }

    )
    this.editEmp.reset()
  }
  




}
