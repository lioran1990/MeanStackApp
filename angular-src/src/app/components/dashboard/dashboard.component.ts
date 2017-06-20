import { Component, OnInit,Input} from '@angular/core';
import {User} from "./user";
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   users: User[] = new Array;
    @Input() user: User;
  constructor(private authService: AuthService,private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    const path = "users/userslist";
    this.authService.getAllUsers(path).subscribe(data => {
      if(data.success){
        console.log({data})
        this.users = this.authService.parseJasonUserList({data});
        console.log('list comp',this.users);
        this.flashMessage.show('Success to bring the users from DB ', {cssClass: 'alert-success', timeout: 3000});
        if(!this.users){
         /* this.flashMessage.show('Success to bring the users from DB ', {cssClass: 'alert-success', timeout: 5000});*/
        }
      } else {
        console.log("im here!!")
        console.log(this.users);
      }
    });
    this.ngOnDestroy();
  }

  ngOnDestroy(){
    this.users = [];
  }

  }


