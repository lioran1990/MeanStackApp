import { Component, OnInit } from '@angular/core';
import {SocketService} from "../../services/socket.service";
// import * as io from "socket.io-client"; 

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.css'],
  providers: [SocketService]
})
export class SocketComponent implements OnInit {
  msg = "No messages";
  lastTweets = [];
  socket:any = null;
  tweetCount = 3;

  constructor(public socketService: SocketService) {
    let cls = this;   

    this.socketService.invokeEvent.subscribe((value) => {
        // console.log("Compotnent:", value); 

        if (cls.lastTweets.length >= cls.tweetCount) {
          cls.lastTweets.pop();
        }

        // cls.lastTweets.push(value);
        cls.lastTweets.unshift(value);
    });
  }

  ngOnInit() {
  }



}
