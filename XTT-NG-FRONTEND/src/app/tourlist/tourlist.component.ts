import { Component, Input } from '@angular/core';
import { Tour, TourBooking } from '../interfaces/tour';
import { TourService } from '../services/tour.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { BookTourService } from '../services/book-tour.service';

@Component({
  selector: 'app-tourlist',
  templateUrl: './tourlist.component.html',
  styleUrls: ['./tourlist.component.css']
})
export class TourlistComponent {

  @Input() filter: string = '';
  @Input() tours: Tour[] = [];

  // tours!: Tour [];

  bookedTours: TourBooking [] = [];
  userID! : string;
  selectedTourID!: string ;

  tourID! : string;

  constructor(private tourService: TourService,private authService: AuthService, private route: ActivatedRoute ,private bookTourService:BookTourService ) {
    
   
  }
 

  bookTour(tourID:string) {
    console.log('Before Book Tour:', this.tourID);
    this.selectedTourID = tourID;
    if (this.selectedTourID) {
    this.bookTourService.bookTour(this.selectedTourID).subscribe(
      (response) => {
        console.log('Tour booked successfully:', response);
        
      },
      (error) => {
        console.error('Error booking tour:', error);
        // Handle error, e.g., display error message
      }
    );
    }else {
      console.warn('No tour selected.');
    }
    console.log('After Book Tour:', this.selectedTourID);
  }

}
