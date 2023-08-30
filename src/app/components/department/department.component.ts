import {  OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentModalComponent } from 'src/app/modals/department/departmentModal.component';
import { DepartmentApiService } from 'src/app/service/department.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})

export class DepartmentComponent {
  displayedColumns: string[] = ['deptId', 'deptName', 'status','Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //a: string | null;
  constructor(private dialog: MatDialog, private api:DepartmentApiService, private auth: AuthenticationService, private route:Router) {
    // this.a=this.api.getToken(); 
    // if (this.a !== null) {
      
    //   this.api.setToken(this.a);
    //   console.log("Token retrieved: "+this.a)
      
    // }

  }

  title = 'DemoProject';

  ngOnInit() {
    
    //if (this.api.showToken() !== null) {
      //setTimeout(() => {
        this.getAllDepartments();
      //}, 2000); // Delay of 1 second (adjust as needed)
   // }
     
  }

  openDialog() {
    this.dialog.open(DepartmentModalComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val=="saved" ){
        this.getAllDepartments();
      }
    })
  }

  getAllDepartments() {
    this.api.getDepartment()
      .subscribe({
        next: (res) => {
          this.dataSource=new MatTableDataSource(res);
          this.dataSource.paginator=this.paginator;
         this.dataSource.sort=this.sort;         
        },
        error: (err) => {
          alert("Unauthorized Access!");
        }
      });
  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  oneditDepartment(row:any){
    this.dialog.open(DepartmentModalComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='updated'){
        this.getAllDepartments();
      }
    })
  }

  deleteDepartment(row:any){
    this.api.deleteDepartment(row)
    .subscribe({
      next:(res)=>{
        alert("Department deleted successfully!")
        this.getAllDepartments();
      },
      error:()=>{
        alert("Unauthorized Access!")
      }
    })
  }

  postLogout(){
    this.auth.logout()
    .subscribe({
      next:(res)=>{
         if (res==true){
          localStorage.removeItem('jwtToken');
          alert("logout successfully");
          this.route.navigate(['signin']);
         }
         else{
            alert("You have already log out!");
         }
      },
      error:()=>{
        alert("Error occured during logout process!");
      }

    })
  }

}
