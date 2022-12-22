import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  ApplyForm, GetSingleFormModel } from 'src/app/models/get-forms-model';
import { GetSelectBoxModel } from 'src/app/models/get-selectbox-model';
import { NotificationService, ToastrMessageType, ToastrPosition } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.scss']
})
export class FormDetailComponent implements OnInit {
  updateStatusModel:UpdateStatusModel=new UpdateStatusModel();
  selectboxes:GetSelectBoxModel=new GetSelectBoxModel();
  noteModel:NoteModel=new NoteModel();
  id:string;
  form:ApplyForm=new ApplyForm();
  constructor(private httpService:HttpClient,private notify:NotificationService,private router:ActivatedRoute) {
    
  }
  ngOnInit(): void {
    this.id=this.router.snapshot.paramMap.get("id");
    this.getForm();
    this.getSelectBox();
  }
  getForm(){
      
    this.httpService.get<GetSingleFormModel>(environment.getApiUrl+"/Forms/GetById/"+this.id).subscribe(response=>{
      
      Object.assign(this.form,response.applyForm)
    },(error:HttpErrorResponse)=>{
      this.notify.message(error.message,"Hata",{messageType:ToastrMessageType.Error, position:ToastrPosition.TopCenter,timeout:2500})
    })
  }
  sendNote(description){
    if (description.value) {
      this.noteModel.description=description.value;
      this.noteModel.id=this.id;
    this.httpService.post(environment.getApiUrl+"/Forms/CreateNote",this.noteModel).subscribe(response=>{
      this.notify.message("Not Boş olamaz!","Hata",{messageType:ToastrMessageType.Success, position:ToastrPosition.TopCenter,timeout:2500})
      this.getForm();
    })
      
    }else{
      this.notify.message("Not Boş olamaz!","Hata",{messageType:ToastrMessageType.Error, position:ToastrPosition.TopCenter,timeout:2500})

    }
  }
  getSelectBox() {
    this.httpService.get<string>(environment.getApiUrl + "/SelectBoxes").subscribe(response => {
      Object.assign(this.selectboxes, response)
      
      console.log(this.selectboxes.milServiceStatus)
    }, error => {

      this.getSelectBox();
    })
}
UpdateStatus(value){
  debugger;
  this.updateStatusModel.applyFormStatus=parseInt(value.value);
  this.updateStatusModel.id=this.id;
  this.httpService.post(environment.getApiUrl+"/Forms/UpdateFormStatus",this.updateStatusModel).subscribe(response=>{
    this.notify.message("Aday Durumu Güncellendi","Başarılı",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopLeft,timeout:2500}),
    this.getForm();
},error=>{
  this.notify.message("Aday Durumu Güncellenemedi","Hata",{messageType:ToastrMessageType.Error,position:ToastrPosition.TopCenter,timeout:2500})

})
}
}
export class NoteModel{
  id:string;
  description:string;
}
export class UpdateStatusModel{
  id:string;
  applyFormStatus:number;
}