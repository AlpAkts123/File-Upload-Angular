import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DynamicQueryModel, Filter } from 'src/app/models/dynamicQueryModels/dynamicQueryModel';
import { ApplyForm, GetAllFormsModel } from 'src/app/models/get-forms-model';
import { getSelectBoxesModel } from 'src/app/models/selectboxes/get-select-box-model';
import { NotificationService, ToastrMessageType, ToastrPosition } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  displayedColumns: string[] = ['name', 'birthDay','whiteCollar','educationstring','departmenAppliedFor','createdAt','formStatusString','Cv','detail'];
  Forms:GetAllFormsModel=new GetAllFormsModel();
  dataSource: MatTableDataSource<ApplyForm>;
  dynamicQuery:DynamicQueryModel=new DynamicQueryModel();
  selectboxes:getSelectBoxesModel=new getSelectBoxesModel();
  @ViewChild (MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

constructor(private httpService:HttpClient,private toastr:NotificationService) {
 this.getForms(); 
 this.getSelectBoxes();
}
  getForms(){
      
    this.httpService.get<GetAllFormsModel>(environment.getApiUrl+"/Forms/Getll").subscribe(response=>{
      Object.assign(this.Forms,response)
      console.log(this.Forms)
      this.dataSource = new MatTableDataSource<ApplyForm>(this.Forms.applyForms);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },(error:HttpErrorResponse)=>{
      
      this.toastr.message(error.message,"Hata",{messageType:ToastrMessageType.Error, position:ToastrPosition.TopCenter,timeout:2500})
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getSelectBoxes(){
    this.httpService.get<getSelectBoxesModel>(environment.getApiUrl+"/SelectBoxes").subscribe(response=>{
      Object.assign(this.selectboxes,response)
      console.log(response.departments)
    },error=>{
    
      console.log(error)
      setTimeout(() => {
        this.getSelectBoxes();
      }, 2500);
    })
  }
  getFilteredData(maindep:MatSelect,dep,edState,after,before){
    this.dynamicQuery.dynamic.sort.push({dir:"desc",field:"createdAt"})
    debugger

    if (maindep.value!="") {
      this.dynamicQuery.dynamic.filter.field="whiteCollar"
      this.dynamicQuery.dynamic.filter.logic="and"
      this.dynamicQuery.dynamic.filter.operator="eq"
      this.dynamicQuery.dynamic.filter.value=maindep.value
      debugger
      
    }
    if (dep.value!=""&&dep.value!=undefined) {
      
      this.dynamicQuery.dynamic.filter.filters.push({field:"departmentName",logic:"and",value:dep.value,operator:"eq"})
      
    }
    if (edState.value!=""&&edState.value!=undefined) {
      this.dynamicQuery.dynamic.filter.filters.push({field:"educationState",logic:"and",value:edState.value,operator:"eq"})
      
    }
    if (after.value!="") {
      this.dynamicQuery.dynamic.filter.filters.push({field:"createdAt",logic:"and",value:after.value,operator:"gte"})
      
    }
    if (before.value!="") {
      this.dynamicQuery.dynamic.filter.filters.push({field:"createdAt",logic:"and",value:before.value,operator:"lte"})
      
    }
    let sending=JSON.stringify(this.dynamicQuery);
      console.log(this.Forms)
    this.httpService.post<GetAllFormsModel>(environment.getApiUrl+"/Forms/GetListByDynamic",this.dynamicQuery).subscribe(response=>{
      debugger;
      Object.assign(this.Forms,response)
      console.log(this.Forms)
      this.dataSource = new MatTableDataSource<ApplyForm>(this.Forms.applyForms);
      this.dataSource.paginator = this.paginator;
      this.toastr.message("Filtrelendi","",{messageType:ToastrMessageType.Info,position:ToastrPosition.TopLeft,timeout:2500})
      this.dynamicQuery=new DynamicQueryModel();


      this.dataSource.sort = this.sort;
    },error=>{
      this.toastr.message("bir Hata oluştu","",{messageType:ToastrMessageType.Error,position:ToastrPosition.TopLeft,timeout:2500})
      this.dynamicQuery=new DynamicQueryModel();
    })
  }
}


