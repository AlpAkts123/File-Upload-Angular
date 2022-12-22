import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GetQrListModel, QrCode } from 'src/app/models/qr/qr-code';
import { NotificationService, ToastrMessageType, ToastrPosition } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-list-qr',
  templateUrl: './create-list-qr.component.html',
  styleUrls: ['./create-list-qr.component.scss']
})
export class CreateListQrComponent implements OnInit {
  qrModel:CreateQrModel=new CreateQrModel();
 constructor(private http:HttpClient,private notify:NotificationService) {
  
 }
  displayedColumns: string[] = ['qrAddress', 'city','Country','detail'];
  qrCodes:GetQrListModel=new GetQrListModel();
  dataSource: MatTableDataSource<QrCode>;
  @ViewChild (MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit(): void {
    this.getListQr();
  }
  getListQr(){
    this.http.get(environment.getApiUrl+"/Forms/GetListQrCode").subscribe(response=>{
      Object.assign(this.qrCodes,response);
      console.log(this.qrCodes)
      this.dataSource=new MatTableDataSource<QrCode>(this.qrCodes.qrCode);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    },error=>{
      console.log(error)
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addQr(qr,adres,country,city){
    this.qrModel.city=city.value;
    this.qrModel.country=country.value;
    this.qrModel.qrAddress=qr.value;
    
    this.http.post(environment.getApiUrl+"/Forms/CreateQr",this.qrModel).subscribe(response=>{
      this.notify.message("Qr Oluşturuldu","Başarılı",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopCenter,timeout:2500});
      this.getListQr();
    },error=>{
      this.notify.message("Qr Oluşturulamadı","Başarısız",{messageType:ToastrMessageType.Error,position:ToastrPosition.TopCenter,timeout:2500})

    })
  }
}

export class CreateQrModel{
  qrAddress:string;
  city:string;
  country:string;
}
