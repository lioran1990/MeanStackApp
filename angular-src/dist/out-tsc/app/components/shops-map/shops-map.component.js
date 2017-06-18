var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { GooglMapService } from "../../services/google-maps/google-map.service";
var ShopsMapComponent = (function () {
    function ShopsMapComponent(googleMapService, authService) {
        this.googleMapService = googleMapService;
        this.authService = authService;
        // Zoom level
        this.zoom = 10;
        //Start Position
        this.lat = 31.973001;
        this.lng = 34.792501;
        //Markers
        this.markers = [];
        this.markers = this.googleMapService.getMarkers();
    }
    ShopsMapComponent.prototype.ngOnInit = function () {
        var _this = this;
        var path = "shops/list";
        this.authService.httpGet(path).subscribe(function (data) {
            if (data.success) {
                console.log("Got authenticated, the shops are");
                _this.markers = _this.googleMapService.pasreJasonShopsList(data);
                //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 5000});
                //this.router.navigate(['/login']);
            }
            else {
                console.log("im here!!");
                //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 5000});
                //this.router.navigate(['/register']);
            }
        });
    };
    ShopsMapComponent.prototype.clickedMarker = function (marker, index) {
        console.log('Clicked Marker: ' + marker.name + ' at index ' + index);
    };
    ShopsMapComponent.prototype.mapClicked = function ($event) {
        var newMarker = {
            name: 'Untitled',
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: false
        };
        this.markers.push(newMarker);
    };
    ShopsMapComponent.prototype.markerDragEnd = function (marker, $event) {
        console.log('dragEnd', marker, $event);
        var updMarker = {
            name: marker.name,
            lat: parseFloat(marker.lat),
            lng: parseFloat(marker.lng),
            draggable: false
        };
        var newLat = $event.coords.lat;
        var newLng = $event.coords.lng;
        this.googleMapService.updateMarker(updMarker, newLat, newLng);
    };
    ShopsMapComponent.prototype.addMarker = function () {
        console.log('Adding Marker');
        if (this.markerDraggable == 'yes') {
            var isDraggable = true;
        }
        else {
            var isDraggable = false;
        }
        var newMarker = {
            name: this.markerName,
            lat: parseFloat(this.markerLat),
            lng: parseFloat(this.markerLng),
            draggable: isDraggable
        };
        this.markers.push(newMarker);
        this.googleMapService.addMarker(newMarker);
    };
    ShopsMapComponent.prototype.removeMarker = function (marker) {
        console.log('Removing marker...');
        for (var i = 0; i < this.markers.length; i++) {
            if (marker.lat == this.markers[i].lat && marker.lng == this.markers[i].lng) {
                this.markers.splice(i, 1);
            }
        }
        this.googleMapService.removeMarker(marker);
    };
    return ShopsMapComponent;
}());
ShopsMapComponent = __decorate([
    Component({
        selector: 'app-shops-map',
        templateUrl: './shops-map.component.html'
    }),
    __metadata("design:paramtypes", [GooglMapService, AuthService])
], ShopsMapComponent);
export { ShopsMapComponent };
//# sourceMappingURL=C:/Users/Lioran/WebstormProjects/SupermarketProject/angular-src/src/app/components/shops-map/shops-map.component.js.map