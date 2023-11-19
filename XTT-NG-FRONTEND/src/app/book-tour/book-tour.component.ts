import { Component } from '@angular/core';
import { BookTourService } from '../services/book-tour.service';
import { User } from '../interfaces/user';
import { Tour } from '../interfaces/tour';

@Component({
  selector: 'app-book-tour',
  templateUrl: './book-tour.component.html',
  styleUrls: ['./book-tour.component.css']
})
export class BookTourComponent {

  userID!: string 
  tourID!: string 

 constructor(private bookTourService:BookTourService){}

//  bookTour() {
//   this.bookTourService.bookTour(this.tourID).subscribe(
//     (response) => {
//       console.log('Tour booked successfully:', response);
//     },
//     (error) => {
//       console.error('Error booking tour:', error);
//     }
//   );
// }

}
