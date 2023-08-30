import {NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { DepartmentComponent } from './components/department/department.component';
import { SignupModalComponent } from './modals/signup-modal/signup-modal.component';
import { SigninComponent } from './modals/signin/signin.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';


const routes: Routes = [
  {path:"",
  component:SigninComponent},

  {path:"employee",
  component:EmployeeComponent},
  
  {path:"department",
   component:DepartmentComponent},
  
   {path:"signup",
  component:SignupModalComponent},

  {path:"signin",
   component:SigninComponent},
   {path:"**",
  component:PagenotfoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
