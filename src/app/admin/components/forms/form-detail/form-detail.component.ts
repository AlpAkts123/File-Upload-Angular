import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  ApplyForm, GetSingleFormModel } from 'src/app/models/get-forms-model';
import { NotificationService, ToastrMessageType, ToastrPosition } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.scss']
})
export class FormDetailComponent implements OnInit {
  id:string;
  form:ApplyForm=new ApplyForm();
  constructor(private httpService:HttpClient,private notify:NotificationService,private router:ActivatedRoute) {
    
  }
  ngOnInit(): void {
    this.id=this.router.snapshot.paramMap.get("id");
    this.getForm();
  }
  getForm(){
      
    this.httpService.get<GetSingleFormModel>(environment.getApiUrl+"/Forms/GetById/"+this.id).subscribe(response=>{
      
      Object.assign(this.form,response.applyForm)
      console.log(this.form)
    },(error:HttpErrorResponse)=>{
      
      this.notify.message(error.message,"Hata",{messageType:ToastrMessageType.Error, position:ToastrPosition.TopCenter,timeout:2500})
    })
  }
}
