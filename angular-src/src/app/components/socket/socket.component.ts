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
  lastTweets = new Array();

  constructor(public socketService: SocketService) {
  }

  ngOnInit() {
    this.lastTweets = Array.from(this.socketService.lastTweets);
    // console.log(this.lastTweets);
  }

}
