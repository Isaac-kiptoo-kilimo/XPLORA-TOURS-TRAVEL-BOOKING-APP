import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookTourService {
  private baseUrl = 'http://localhost:4500/tours';
  constructor(private http:HttpClient) { }

  bookTour(userID: string, tourID: string):Observable<any>{
    const body={userID,tourID}
    return this.http.post(`${this.baseUrl}/book/`, body)
  }

  getBookedTours(userID:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/bookedTours/${userID}`)

  }
}
