import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { FormsComponent } from './components/forms/forms.component';
import { UsersComponent } from './components/users/users.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PipesModule } from '../services/pipes/pipes.module';
import {MatSelectModule} from '@angular/material/select';
import { LoginComponent } from './components/login/login.component';
import { MatButtonModule } from '@angular/material/button';
const routes:Routes = [{ path: "", component: DashboardComponent },
{ path: "users", component: UsersComponent }, { path: "forms", component: FormsComponent },
{ path: "login", component: LoginComponent }]
@NgModule({
  declarations: [
    AdminComponent,
    FormsComponent,
    UsersComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    PipesModule
  ], exports: [AdminComponent,
    FormsComponent,
    UsersComponent,
    DashboardComponent]
})
export class AdminModule { }
