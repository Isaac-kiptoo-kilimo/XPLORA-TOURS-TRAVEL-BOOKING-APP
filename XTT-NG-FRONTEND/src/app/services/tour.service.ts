import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tour } from '../interfaces/tour';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) {}
  createTour(tour: Tour): Observable<any> {
    return this.http.post('http://localhost:4500/tours/create', tour);
  }

  getTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>('http://localhost:4500/tours/all', {
      headers: {
        'Content-type': 'application/json',
      },
    });
  }


  updateTourById(tourID: string, updatedTour: Tour): Observable<any> {
    return this.http.put(`http://localhost:4500/tours/update/${tourID}`, updatedTour);
  }
  

  // updateUserById(updatedTour:Tour): Observable<any> {
  //   return this.authService.getUserDetails().pipe(
  //     switchMap((user) => {
  //       console.log(user.userID);
  //       let userID=user.userID
        
  
  //       const url = `http://localhost:4500/users/updateUser/${userID}`;
  
  //       const headers = new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         'token': token,
  //       });
  
  //       return this.http.put(url, updatedUser, { headers });
  //     })
  //   );
  // }

  deleteTour(tourID: string): Observable<any> {
    return this.http.delete(`http://localhost:4500/tours/${tourID}`)
   
  }

  searchToursByType(type: string): Observable<Tour[]> {
    const params = new HttpParams().set('type', type);
    return this.http.get<Tour[]>('http://localhost:4500/tours/search', { params });
  }
}




