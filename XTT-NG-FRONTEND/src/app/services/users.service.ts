import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators'; 
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl='http://localhost:4500/users/checkUserDetails'
  

  constructor(private http: HttpClient) { }



getUsers(): Observable<User[]> {
  const token = localStorage.getItem('token') as string;
  return this.http.get<User[]>('http://localhost:4500/users/', {
    headers: {
      'Content-type': 'application/json',
      'token': token
    },
  });
}


  checkDetails(): Observable<string> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token
    });

    return this.http.get<any>(this.apiUrl, { headers }).pipe(map(data => data.info.role));
  }

}
  

