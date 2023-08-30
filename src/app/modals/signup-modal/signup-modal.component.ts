import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent {

  loading: boolean = false;
  status=['Active','InActive']
  hide = true;
  signupForm !:FormGroup

  constructor(private formBuilder:FormBuilder, private api:AuthenticationService, private route:Router){}

  ngOnInit(): void{
    this.signupForm = this.formBuilder.group({
      companyName:['',Validators.required],
      companyEmail:['',[Validators.required,Validators.email]],
      companyPhone:['',Validators.required],
      userFirstName:['',Validators.required],
      userLastName:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(7)]],
      status:['',Validators.required]
    })
  }

  
  getErrorMessage(){
    const emailControl=this.signupForm.get('companyEmail');

    if(emailControl?.hasError('required')){
      return "You must enter email."
    }
    return emailControl?.hasError('email') ? "Not a valid email.":"";
  }

  postCompany(){

    this.loading=true;
    this.api.postCompany(this.signupForm.value)  .pipe(
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe({
      next:(res)=>{
        alert("Company has been registered successfully!");
        this.route.navigate(["/signin"]);
     
      },
      error:()=>{
        alert("Please! Provide complete data before registering the company or the company is already registered.")
      }
      
    })
  }

  
}
