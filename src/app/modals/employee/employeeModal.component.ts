import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeApiService } from '../../service/employee.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentApiService } from 'src/app/service/department.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employeeModal.component.html',
  styleUrls: ['./employeeModal.component.css']
})
export class EmployeeModalComponent {
  
  
  departments!:any;

  actionBtn="Save";
  status = ["Active","Retired"];
  employeeForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private api: EmployeeApiService,private departmentApiService:DepartmentApiService ,private dialogRef:MatDialogRef<EmployeeModalComponent>) {}

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      employeeName: ['', Validators.required],
      employeeFatherName: ['', Validators.required],
      employeeeMail: ['', [Validators.required, Validators.email]],
      employeeContactNo: ['', Validators.required],
      deptAutoId: [1, Validators.required],
      status: ['', Validators.required],
      employeeDesignation:['',Validators.required],
      // date:['',Validators.required]
    });

    if(this.editData){
      this.actionBtn="Update"
      this.employeeForm.controls['employeeName'].setValue(this.editData.employeeName),
      this.employeeForm.controls['employeeFatherName'].setValue(this.editData.employeeFatherName),
      this.employeeForm.controls['employeeeMail'].setValue(this.editData.employeeeMail),
      this.employeeForm.controls['employeeContactNo'].setValue(this.editData.employeeContactNo),
      this.employeeForm.controls['deptAutoId'].setValue(this.editData.deptAutoId),
      this.employeeForm.controls['status'].setValue(this.editData.status),
      this.employeeForm.controls['employeeDesignation'].setValue(this.editData.employeeDesignation)

    }

    this.getAllDepartment();
  }

  addEmployee() {
    if (!this.editData){
       
      const formData = {
        ...this.employeeForm.value, // Spread the form values
        deptId: parseInt(this.employeeForm.value.deptId) // Convert deptId to integer
      };
    
      this.api.postEmployee(formData)
      .subscribe({
        next: (res)=>{
          alert("Employee has been added!")
          this.employeeForm.reset();
          this.dialogRef.close("saved");
        },
        error:()=>{
          alert("Unauthorized Access!")
        }

      })
    }
    else{
      this.updateEmployee()
    }
  }

  updateEmployee(){
    const payload = {
      ...this.employeeForm.value,
      employeeAutoId: this.editData.employeeAutoId,
      employeeId: this.editData.employeeId
    };

    this.api.putEmployee(payload,this.editData.employeeAutoId)
    .subscribe({
      next:(res)=>{
        console.log(this.employeeForm.value,this.editData.employeeAutoId);
        alert("Employee Updated Successfully");
        this.employeeForm.reset();
        this.dialogRef.close("updated");
      },
      error:()=>{
           alert("Unauthorized Access!")
      }
    })
  }

  getErrorMessage(){
    const emailControl=this.employeeForm.get('email');

    if(emailControl?.hasError('required')){
      return "You must enter email."
    }
    return emailControl?.hasError('email') ? "Not a valid email.":"";
  }

  
  getAllDepartment(){
    this.departmentApiService.getDepartment()
    .subscribe(
      data=>{
        this.departments=data;
        console.log(this.departments);
      }
    )
  }
 

}

