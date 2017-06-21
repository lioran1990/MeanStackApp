import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import { tokenNotExpired } from 'angular2-jwt';
import {User} from "../components/dashboard/user";

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  newUsersList: User[] = new Array;


  constructor(private http:Http) { }

  registerUser(user){
    let headers= new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/users/register', user, {headers:headers}).map(res=>res.json());
  }
  authenticateUser(user){
    let headers= new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/users/authenticate', user, {headers:headers}).map(res=>res.json());

  }
  getAllUsers(path){
    let headers= new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('/'+path,{headers: headers}).map(res => res.json());
  }


  getProfile(){
    let headers= new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('/users/profile',{headers:headers}).map(res=>res.json());
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
    return this.http.post('/'+path, object,{headers: headers})
      .map(res => res.json());

  }

  httpGet(path){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('/'+path,{headers: headers})
      .map(res => res.json());
  }


  parseJsonSingleUser(user) {
    let newUser: User;
    newUser = new User(user.email,user.name,user.username);
    return newUser;
  }

  parseJasonUserList(userList) {
    let newUser: User;
    let i: number = 0;
    console.log(userList.data.users);
    for (let user of userList.data.users) {
      newUser = this.parseJsonSingleUser(user)
      this.newUsersList[i] = newUser;
      i++;
    }
    return this.newUsersList;
  }

}
