import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:Http) { }

  registerUser(user){
    let headers= new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers:headers}).map(res=>res.json());
  }
  authenticateUser(user){
    let headers= new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers:headers}).map(res=>res.json());

  }

  getProfile(){
    let headers= new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile',{headers:headers}).map(res=>res.json());
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
     return tokenNotExpired('id_token');
  }

  //Saves user auth token and details in local storage for further use
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  //Clear local stroage that holds the user auth token and user details
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  httpPost(object,path){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    console.log("in HTTP Post");
    return this.http.post('http://localhost:3000/'+path, object,{headers: headers})
      .map(res => res.json());

  }

  httpGet(path){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/'+path,{headers: headers})
      .map(res => res.json());
  }

}
