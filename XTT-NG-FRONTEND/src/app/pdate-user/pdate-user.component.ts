import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, updatedUserData } from '../interfaces/user';

@Component({
  selector: 'app-pdate-user',
  templateUrl: './pdate-user.component.html',
  styleUrls: ['./pdate-user.component.css']
})
export class PdateUserComponent {
  updatedUserData!: updatedUserData[];
  userID! : string 
  updateUserForm!: FormGroup

  isFormVisible: boolean=true

  constructor(private userService:UsersService,private formBuilder:FormBuilder){
    this.updateUserForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]]

    });
    
  }

  updateUser(){
    let updatedUser: User = this.updateUserForm.value;
    // updatedUser.userID = this.userID
       console.log(updatedUser);
       
    this.userService.updateUserById(updatedUser).subscribe(
      (response) => {
        console.log(response);
        
        console.log('User updated successfully', response);
        this.updateUserForm.reset();
        this.isFormVisible = false;
      },
      (error) => {
        console.error('Error updating user', error);
      }
    );
  }

}
