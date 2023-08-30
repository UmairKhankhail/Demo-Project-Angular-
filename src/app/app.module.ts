import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {EmployeeModalComponent } from './modals/employee/employeeModal.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import {  NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule} from '@angular/material/sort';
import { EmployeeComponent } from './components/employee/employee.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './components/department/department.component';
import { DepartmentModalComponent } from './modals/department/departmentModal.component';
import { FormsModule } from '@angular/forms';
import { SignupModalComponent } from './modals/signup-modal/signup-modal.component';
import { SigninComponent } from './modals/signin/signin.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeModalComponent,
    DepartmentModalComponent,
    EmployeeComponent,
    DepartmentComponent,
    SignupModalComponent,
    SigninComponent,
    PagenotfoundComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    NgIf,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatProgressSpinnerModule
        
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
