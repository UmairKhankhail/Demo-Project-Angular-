import { Component , Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentApiService } from 'src/app/service/department.service';

@Component({
  selector: 'app-departmentModal',
  templateUrl: './departmentModal.component.html',
  styleUrls: ['./departmentModal.component.css']
})
export class DepartmentModalComponent {

  
  actionBtn="Save";
  status = ["Active","InActive"];
  departmentForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private api: DepartmentApiService ,private dialogRef:MatDialogRef<DepartmentModalComponent>) {};

  ngOnInit(): void {
    this.departmentForm = this.formBuilder.group({
      deptName: ['', Validators.required],
      status: ['', Validators.required],
      
    });

    if(this.editData){
      this.actionBtn="Update"
      this.departmentForm.controls['deptName'].setValue(this.editData.deptName),
      this.departmentForm.controls['status'].setValue(this.editData.status)
    }
  }

  addDepartment() {
    if (!this.editData){
       
      const formData = {
        ...this.departmentForm.value, // Spread the form values
        deptId: parseInt(this.departmentForm.value.deptId) // Convert deptId to integer
      };
    
      this.api.postDepartment(formData)
      .subscribe({
        next: (res)=>{
          alert("Department has been added!")
          this.departmentForm.reset();
          this.dialogRef.close("saved");
        },
        error:()=>{
          alert("Unauthorized Access!")
        }

      })
    }
    else{
      this.updateDepartment()
    }
  }

  updateDepartment(){
    const payload = {
      ...this.departmentForm.value,
      deptAutoId: this.editData.deptAutoId,
      deptId: this.editData.deptId
    };

    this.api.putDepartment(payload,this.editData.deptAutoId)
    .subscribe({
      next:(res)=>{
        console.log(this.departmentForm.value,this.editData.deptAutoId);
        alert("Department Updated Successfully");
        this.departmentForm.reset();
        this.dialogRef.close("updated");
      },
      error:()=>{
           alert("Unauthorized Access!")
      }
    })
  }


}
