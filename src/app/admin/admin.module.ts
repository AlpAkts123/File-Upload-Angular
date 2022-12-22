import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { FormsComponent } from './components/forms/forms.component';
import { UsersComponent } from './components/users/users.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatListModule} from '@angular/material/list';

import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LoginComponent } from './components/login/login.component';
import { PipesModule } from '../services/pipes/pipes.module';
import { FormDetailComponent } from './components/forms/form-detail/form-detail.component';
import { QrComponent } from './components/qr/qr.component';
import { MatDividerModule } from '@angular/material/divider';

import { QRCodeModule } from 'angularx-qrcode';
import { CreateListQrComponent } from './components/qr/create-list-qr/create-list-qr.component';


const routes:Routes = [{ path: "", component: DashboardComponent },
{ path: "users", component: UsersComponent }, { path: "forms", component: FormsComponent },{ path: "forms/detail/:id", component: FormDetailComponent },{ path: "qr/detail/:id", component: QrComponent },
{ path: "login", component: LoginComponent },{ path: "qr/createlistqr", component: CreateListQrComponent }]
@NgModule({
  declarations: [
    AdminComponent,
    FormsComponent,
    UsersComponent,
    DashboardComponent,
    FormDetailComponent,
    QrComponent,
    CreateListQrComponent

  ],
  imports: [
    CommonModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatListModule,
    QRCodeModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDividerModule,
    MatSelectModule,
    PipesModule,
    RouterModule.forChild(routes),
  ],
   exports: [AdminComponent,
    FormsComponent,
    MatListModule,
    MatPaginatorModule,
    UsersComponent,
    MatTableModule,
    DashboardComponent]
})
export class AdminModule { }
