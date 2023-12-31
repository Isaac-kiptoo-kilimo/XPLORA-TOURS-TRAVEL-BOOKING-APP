import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { switchMap } from 'rxjs/operators';

import { map } from 'rxjs/operators'; 
import { User, UserDetails, updatedUserData } from '../interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl='http://localhost:4500/users/checkUserDetails'
  userID!:UserDetails;
   

  constructor(private http: HttpClient, private authService:AuthService) { }



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



updateUserById(updatedUser:updatedUserData): Observable<any> {
  return this.authService.getUserDetails().pipe(
    switchMap((user) => {
      console.log(user.userID);
      let userID=user.userID
      const token = localStorage.getItem('token') || '';
      console.log(token);

      const url = `http://localhost:4500/users/updateUser/${userID}`;

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token,
      });

      return this.http.put(url, updatedUser, { headers });
    })
  );
}

deleteUser(userID: string): Observable<any> {
  return this.http.delete(`http://localhost:4500/users/delete/${userID}`)
 
}

}  

