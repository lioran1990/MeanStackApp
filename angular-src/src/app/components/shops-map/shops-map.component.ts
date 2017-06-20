import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {GooglMapService} from "../../services/google-maps/google-map.service";

@Component({
  selector: 'app-shops-map',
  templateUrl: './shops-map.component.html'
})
export class ShopsMapComponent implements OnInit{
  // Zoom level
  zoom: number = 10;
  //Start Position
  lat: number = 31.973001;
  lng: number = 34.792501;
  //Values
  markerName: string;
  markerLat: string;
  markerLng: string;
  markerDraggable: string;
  //Markers
  markers: marker[] = [

  ];


  constructor(private googleMapService: GooglMapService, private authService:AuthService){
    this.markers = this.googleMapService.getMarkers();
  }

  ngOnInit() {

    const path = "shops/list";
    this.authService.httpGet(path).subscribe(data => {
      if(data.success){
        console.log("Got authenticated, the shops are");
        this.markers =  this.googleMapService.pasreJasonShopsList(data);
        //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 5000});
        //this.router.navigate(['/login']);
      } else {
        console.log("im here!!")
        //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 5000});
        //this.router.navigate(['/register']);
      }
    });
  }

  clickedMarker(marker:marker, index:number){
    console.log('Clicked Marker: '+marker.name+' at index '+index);
  }

  mapClicked($event:any) {
    var newMarker = {
      name: 'Untitled',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    }
    this.markers.push(newMarker);

  }
  markerDragEnd(marker:any, $event:any){
    console.log('dragEnd', marker, $event);

    var updMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      lng:  parseFloat(marker.lng),
      draggable: false
    }

    var newLat = $event.coords.lat;
    var newLng = $event.coords.lng;

    this.googleMapService.updateMarker(updMarker, newLat, newLng);

  }

  addMarker(){
    console.log('Adding Marker');
    if(this.markerDraggable == 'yes'){
      var isDraggable = true;
    }else{
      var isDraggable = false;
    }

    var newMarker = {
      name: this.markerName,
      lat: parseFloat(this.markerLat),
      lng: parseFloat(this.markerLng),
      draggable: isDraggable
    }
    this.markers.push(newMarker);
    this.googleMapService.addMarker(newMarker);
  }
  removeMarker(marker){
    console.log('Removing marker...');
    for(var i  = 0 ; i < this.markers.length ; i++ ){
      if(marker.lat == this.markers[i].lat && marker.lng == this.markers[i].lng){
        this.markers.splice(i, 1);

      }
    }
    this.googleMapService.removeMarker(marker);
  }
}
//Marker Type
interface  marker{
  name?: string;
  lat: number;
  lng: number;
  draggable: boolean;
}
