import { Injectable } from '@angular/core';
import * as io from "socket.io-client"; 

@Injectable()
export class SocketService {

  msg: string;
  socket:any = null;
  lastTweets = [];

  constructor() {  
    this.lastTweets.push = function (){
      if (this.length >= 10) {
        this.shift();
      }
      return Array.prototype.push.apply(this,arguments);
    }

    let cls = this;
    this.socket = io();

    this.socket.on('tweet', function(tweet){
      console.log(tweet);
      cls.lastTweets.push(tweet);

      // if (reference.lastTweets.length >= 10) {
      //   reference.lastTweets.shift();
      // }

      console.log(cls.lastTweets.length);
    });
  }

  public getTweets() {
    return this.lastTweets;
  }
}
