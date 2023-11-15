import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tour } from 'src/app/interfaces/tour';
import { User } from 'src/app/interfaces/user';
import { TourService } from 'src/app/services/tour.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent {


  tours!: Tour[];
  users!: User[];
  // visible = true
 

  constructor(private tourService: TourService, private router: Router, private userService:UsersService,private cdr: ChangeDetectorRef ){

  }

  ngOnInit() {
    this.getTours();
    this.getUsers();
    
  }



  getTours() {
    this.tourService.getTours().subscribe(
      (response) => {
        this.tours = response;
        this.cdr.detectChanges()
      },
      (error) => {
        console.error('Error fetching tours:', error);
      }
    );
  }


  getUsers() {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }




  loadTours(): void {
    this.tourService.getTours().subscribe(
      (tours) => {
        this.tours = tours;
      },
      (error) => {
        console.error('Error fetching tours:', error);
      }
    );
  }


  deleteTour(tourID: string): void {
    alert('Are you sure You want to delete,this action is irreversible')
    this.tourService.deleteTour(tourID).subscribe(
      () => {
        this.loadTours();
      },
      (error) => {
        console.error('Error deleting Tour:', error);
      }
    );
  }


}





  
