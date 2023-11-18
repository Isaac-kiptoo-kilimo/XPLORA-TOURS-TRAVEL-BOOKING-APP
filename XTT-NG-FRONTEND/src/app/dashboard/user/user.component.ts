
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tour, TourBooking } from 'src/app/interfaces/tour';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { BookTourService } from 'src/app/services/book-tour.service';
import { TourService } from 'src/app/services/tour.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  userDetails!: User;
  visible = true
  notVisible=false
  loggedIn=true

  tours!: Tour[];

  bookedTours: TourBooking[] = [];
  userID! : string;
  
  tourID! : string;
  

  constructor(private tourService: TourService,private authService: AuthService, private route: ActivatedRoute,private userService:UsersService,private bookTourService:BookTourService ) {}
 
  ngOnInit() {
    this.getBookedTours()
    this.getTours();
    
    const userID = this.route.snapshot.paramMap.get('userID');

    if (userID) {
      this.authService.getUserDetails(userID).subscribe(
        (userDetails) => {
          this.userDetails = userDetails;
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    } else {
      console.error('userID is null.');
    }
  }
  
 
  getTours() {
    this.tourService.getTours().subscribe(
      (response) => {
        this.tours = response;
      },
      (error) => {
        console.error('Error fetching tours:', error);
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

  bookTour(){
    
    this.bookTourService.bookTour(this.userID, this.tourID).subscribe(
      (response) => {
        console.log('Tour booked successfully:', response);
      },
      (error) => {
        console.error('Error booking tour:', error);
      }
    );
   }

   getBookedTours() {
    this.bookTourService.getBookedTours(this.userID).subscribe(
      (response) => {
        this.bookedTours = response;
      },
      (error) => {
        console.error('Error fetching booked tours:', error);
      }
    );
  }

  }

