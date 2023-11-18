import { Component } from '@angular/core';
import { BookTourService } from '../services/book-tour.service';

@Component({
  selector: 'app-book-tour',
  templateUrl: './book-tour.component.html',
  styleUrls: ['./book-tour.component.css']
})
export class BookTourComponent {
 constructor(private bookTourService:BookTourService){}

 bookTour(){
  const userID = 'e89cd53c-df5e-4ed4-a98a-9db4c7f9ced6';
  const tourID = '3d5d6c71-77c8-49b2-8f8e-38f0b5a79fec';

  this.bookTourService.bookTour(userID, tourID).subscribe(
    (response) => {
      console.log('Tour booked successfully:', response);
    },
    (error) => {
      console.error('Error booking tour:', error);
    }
  );
 }
}
