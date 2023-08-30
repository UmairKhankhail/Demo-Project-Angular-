import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeModalComponent } from '../../modals/employee/employeeModal.component';
import { EmployeeApiService } from 'src/app/service/employee.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {


  displayedColumns: string[] = ['employeeId', 'employeeName', 'employeeFatherName','employeeContactNo','employeeeMail', 'employeeDesignation','status','Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api:EmployeeApiService, private auth:AuthenticationService, private route:Router) {}

  title = 'DemoProject';



  ngOnInit() {
   this.getAllEmployees();


  }

  openDialog() {
    this.dialog.open(EmployeeModalComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val=="saved" ){
        this.getAllEmployees();
      }
    })
  }

  getAllEmployees() {
    this.api.getEmployee()
      .subscribe({
        next: (res) => {
          this.dataSource=new MatTableDataSource(res);
          this.dataSource.paginator=this.paginator;
         this.dataSource.sort=this.sort;         
        },
        error: () => {
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

  oneditEmployee(row:any){
    this.dialog.open(EmployeeModalComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='updated'){
        this.getAllEmployees();
      }
    })
  }

  deleteEmployee(row:any){
    this.api.deleteEmployee(row)
    .subscribe({
      next:(res)=>{
        alert("Employee deleted successfully!")
        this.getAllEmployees();
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


