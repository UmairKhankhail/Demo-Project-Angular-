import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

//   displayedColumns: string[] = ['employeeId', 'employeeName', 'employeeFatherName','employeeContactNo','employeeeMail', 'employeeDesignation','status','Action'];
//   dataSource!: MatTableDataSource<any>;

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;

//   constructor(private dialog: MatDialog, private api:ApiService) {}

  title = 'DemoProject';

  ngOnInit() {
  //  this.getAllEmployees();
  
  }

//   openDialog() {
//     this.dialog.open(DialogComponent, {
//       width: '30%'
//     }).afterClosed().subscribe(val=>{
//       if(val=="saved" ){
//         this.getAllEmployees();
//       }
//     })
//   }

//   getAllEmployees() {
//     this.api.getEmployee()
//       .subscribe({
//         next: (res) => {
//           this.dataSource=new MatTableDataSource(res);
//           this.dataSource.paginator=this.paginator;
//          this.dataSource.sort=this.sort;         
//         },
//         error: (err) => {
//           alert("Error occurred while fetching the records!");
//         }
//       });
//   }




//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();

//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }

//   oneditEmployee(row:any){
//     this.dialog.open(DialogComponent,{
//       width:'30%',
//       data:row
//     }).afterClosed().subscribe(val=>{
//       if(val==='updated'){
//         this.getAllEmployees();
//       }
//     })
//   }

//   deleteEmployee(row:any){
//     this.api.deleteEmployee(row)
//     .subscribe({
//       next:(res)=>{
//         alert("Employee deleted successfully!")
//         this.getAllEmployees();
//       },
//       error:()=>{
//         alert("Error occured while deleting the employee!")
//       }
//     })
//   }
}


