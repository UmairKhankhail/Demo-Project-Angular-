import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  
  loading: boolean = false;
  hide = true;
  signinForm!:FormGroup;
  
  constructor(private formBuilder:FormBuilder, private api:AuthenticationService, private route:Router){}

  ngOnInit(){
    this.signinForm=this.formBuilder.group({
      userName:['',Validators.required],
      password:['',Validators.required]
    })
  }

  postLogin(){

    this.loading=true;
    const email=this.signinForm.get('userName')?.value;
    const password=this.signinForm.get('password')?.value;// Encode the password
    
    this.api.postLogin(email,password).pipe(
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe({
      next:(res)=>{
        if (res.jwtToken==="Already Logged In"){
          alert("Already Logged In!")
          this.route.navigate(["/department"]);

        }

        else{
        localStorage.setItem('jwtToken',res.jwtToken);
        this.route.navigate(["/department"]);
      }
    },
      error:()=>{
        alert("Incorrect email or password!")
      }
      
    })
  }

  getErrorMessage(){
    const emailControl=this.signinForm.get('companyEmail');

    if(emailControl?.hasError('required')){
      return "You must enter email."
    }
    return emailControl?.hasError('email') ? "Not a valid email.":"";
  }

}
