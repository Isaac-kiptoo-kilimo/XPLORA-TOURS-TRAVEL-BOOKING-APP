import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  logInUserForm: FormGroup;

  errorMessage!: string;
  successMessage!: string ;
  loggingIn: boolean = false;
  loggedInState: boolean = false;
  loggedIn: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService:UsersService,
    private router: Router
  ) {
    this.logInUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

// loginUser(){

// }

getErrorMessage(controlName: string) {
  const control = this.logInUserForm.get(controlName);
  return control?.hasError('required') ? 'This field is required' :
    control?.hasError('email') ? 'Not a valid email' :'';
}

  loginUser() {
    if (this.logInUserForm.invalid) {
      return;
    }
  
    const data = this.logInUserForm.value;
  
    this.loggingIn = true;
  
    this.authService.login(data).subscribe(
      (result) => {

        const token = result.token;
        localStorage.setItem('token', token);
  
        console.log('Login successful. Token:', token); 

       
        
        this.userService.checkDetails().subscribe(
          
          (role) => {
            console.log('User role:', role); 
            this.loggedInState = true;
            this.successMessage = 'Logged in successfully.';
            setTimeout(() => {
              this.successMessage = '';
              this.loggingIn = false;
  
              if (role === 'admin') {
                this.router.navigate(['admin']);
              } else if (role === 'user') {
                this.router.navigate(['user']);
              }
            }, 2000);
          },
          (error) => {
            console.error('Error fetching user details:', error);
          }
        );
      },
      (error) => {
        console.error('Error during login:', error);
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password.';
        } else {
          this.errorMessage = error.error.error;
        }
        setTimeout(() => {
          this.errorMessage = '';
          this.loggingIn = false;
        }, 3000);
      }
    );
  }
  
}
