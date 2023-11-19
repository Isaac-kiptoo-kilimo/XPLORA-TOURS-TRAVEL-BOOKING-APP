import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  visible = true;
  loggedIn: boolean = false;
  tourService: any;

 constructor(private router: Router, private authService: AuthService, private formBuilder:FormBuilder) {
    this.loggedIn = authService.isLoggedIn();
  }

 

  logout() {
    this.router.navigate(['']);
    localStorage.clear();
    this.loggedIn = false;
  }
}
