import { Injectable } from '@angular/core';
import * as io from "socket.io-client"; 
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SocketService {

  msg: string;
  socket:any = null;
  public invokeEvent:Subject<any> = new Subject();

  constructor() {  
    let cls = this;
    this.socket = io();

    this.socket.on('tweet', function(tweet){
      // console.log(tweet);
      cls.callComponent(tweet);
    });
  }

  callComponent(value) {
      // console.log("callComponent");
      this.invokeEvent.next(value);
  }
}
