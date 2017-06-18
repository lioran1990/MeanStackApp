/**
 * Created by Lioran on 6/17/2017.
 */
import {Injectable} from '@angular/core';
import {Init} from "../../components/shops-map/init-markers";

@Injectable()
export class GooglMapService extends Init {

  markers = new Array()

  marker = {
    name: '',
    lat: Number,
    lng: Number,
    draggable: Boolean
  }


  constructor() {
    super();
    console.log('MarkerService Initialized...');
    this.load();
  }

  getMarkers() {
    var markers = JSON.parse(localStorage.getItem('markers'));
    return markers;
  }

  addMarker(newMarker) {
    // Fetch markers
    var markers = JSON.parse(localStorage.getItem('markers'));
    //push to array
    markers.push(newMarker);
    // Set ls markers again
    localStorage.setItem('markers', JSON.stringify(markers));
  }

  updateMarker(marker, newLat, newLng) {
    //Fetch markers
    var markers = JSON.parse(localStorage.getItem('markers'));

    for (var i = 0; i < markers.length; i++) {
      if (marker.lat == markers[i].lat && marker.lng == markers[i].lng) {
        markers[i].lat = newLat;
        markers[i].lng = newLng;
      }
    }
    //set ls markers again
    localStorage.setItem('markers', JSON.stringify('markers'));


  }

  removeMarker(marker) {
    //Fetch markers
    var markers = JSON.parse(localStorage.getItem('markers'));
    console.log(markers);

    for (var i = 0; i < markers.length; i++) {
      if (marker.lat == markers[i].lat && marker.lng == markers[i].lng) {
        markers.splice(i, 1);
      }
    }
    //set ls markers again
    localStorage.setItem('markers', JSON.stringify('markers'));
  }

  pasreJasonShopsList(shops) {
    console.log("parsing shops:")
    console.log(shops);
    for (let shop of shops.callback) {
      console.log(shop);
      var newShopMarker = {
        name: shop.shopBranchName,
        lat: shop.lat,
        lng: shop.lng,
        draggable: false
      }
      console.log(newShopMarker);
      this.markers.push(newShopMarker);
    }
    console.log("The markers are: " + this.markers);
    return this.markers;
  }
}
