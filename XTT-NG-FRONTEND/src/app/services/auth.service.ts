import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,) { }

  registerUser(user:User){
    this.http.post('http://localhost:4500/users/register/',user).subscribe(res=>{
      return res
    })
  }

}
