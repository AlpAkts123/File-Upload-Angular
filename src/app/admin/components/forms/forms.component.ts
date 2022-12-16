import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Dynamic, DynamicRootObject, Filter, Sort } from 'src/app/models/dynamic-query-model';
import { ApplyForm, GetFormsModel } from 'src/app/models/get-forms-model';
import { GetSelectBoxModel } from 'src/app/models/get-selectbox-model';
import { NotificationService, ToastrMessageType, ToastrPosition } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'birthday', 'gender', 'militaryServiceDelayTime', 'whiteCollar', 'educationState', 'departmenAppliedFor', 'cv'];
  AllForms: GetFormsModel = new GetFormsModel();
  dataSource: MatTableDataSource<ApplyForm>;
  selectboxes:GetSelectBoxModel=new GetSelectBoxModel();
  dynamicQueryModel:DynamicRootObject=new DynamicRootObject();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private htppService: HttpClient, private toastr: NotificationService,private router:Router) {


  }
  ngOnInit(): void {
    this.getForms();
    this.getSelectBox();
  }

  getForms() {

    this.htppService.get<GetFormsModel>(environment.getApiUrl + "/Forms/Getll").subscribe(response => {
      Object.assign(this.AllForms, response)
      console.log(this.AllForms)
      this.dataSource = new MatTableDataSource<ApplyForm>(this.AllForms.applyForms);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    }, (error: HttpErrorResponse) => {

      this.toastr.message(error.message, "Hata", { messageType: ToastrMessageType.Error, position: ToastrPosition.TopCenter, timeout: 2500 })
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  download(url:string){
    var element= document.getElementById(url) as HTMLLinkElement
    element.href="https:/localhost:7083/"+url
  }
  getSelectBox() {
    this.htppService.get<string>(environment.getApiUrl + "/SelectBoxes").subscribe(response => {
      Object.assign(this.selectboxes, response)
      
      console.log(this.selectboxes.milServiceStatus)
    }, error => {

      this.getSelectBox();
    })
  }
  getFilteredData(maindep:MatSelect,department:MatSelect,milStatus:MatSelect,after:HTMLInputElement,before:HTMLInputElement){
    this.dynamicQueryModel.dynamic.sort=[];
 
    this.dynamicQueryModel.dynamic.sort.push({dir:"asc",field:"name"})
    
    if (maindep.value!=null||maindep.value!=undefined) {
      this.dynamicQueryModel.dynamic.filter.field="isWhiteCollar";
      this.dynamicQueryModel.dynamic.filter.logic="and";
      this.dynamicQueryModel.dynamic.filter.operator="eq";
      this.dynamicQueryModel.dynamic.filter.value=maindep.value;
    }
    if (department.value!=null||maindep.value!=undefined) {
      let filter:Filter={field:"departmentName",operator:"eq",value:department.value}
      this.dynamicQueryModel.dynamic.filter.filters.push(filter);
    }
    if (milStatus.value!=null||maindep.value!=undefined) {
      let filter:Filter={field:"militaryServiceStatus",operator:"eq",value:milStatus.value}
      this.dynamicQueryModel.dynamic.filter.filters.push(filter)
    }
    if (after.value!=null||maindep.value!=undefined) {
      let filter:Filter={field:"createdAt",operator:"gte",value:after.value}
      this.dynamicQueryModel.dynamic.filter.filters.push(filter)
    }
    if (before.value!=null||maindep.value!=undefined) {
      let filter:Filter={field:"createdAt",operator:"lte",value:before.value}
      this.dynamicQueryModel.dynamic.filter.filters.push(filter)
    }
    debugger;
    this.htppService.post(environment.getApiUrl+"/Forms/GetListByDynamic",this.dynamicQueryModel).subscribe(response=>{
      Object.assign(this.AllForms, response)
      console.log(this.AllForms)
      this.dataSource = new MatTableDataSource<ApplyForm>(this.AllForms.applyForms);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },error=>{
      debugger
    })
  }
}

