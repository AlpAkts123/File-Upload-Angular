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



const routes:Routes = [{ path: "", component: DashboardComponent },
{ path: "users", component: UsersComponent }, { path: "forms", component: FormsComponent },
{ path: "login", component: LoginComponent }]
@NgModule({
  declarations: [
    AdminComponent,
    FormsComponent,
    UsersComponent,
    DashboardComponent

  ],
  imports: [
    CommonModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSelectModule,
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
