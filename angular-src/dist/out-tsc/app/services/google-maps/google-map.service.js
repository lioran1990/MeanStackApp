var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Lioran on 6/17/2017.
 */
import { Injectable } from '@angular/core';
import { Init } from "../../components/shops-map/init-markers";
var GooglMapService = (function (_super) {
    __extends(GooglMapService, _super);
    function GooglMapService() {
        var _this = _super.call(this) || this;
        _this.markers = new Array();
        _this.marker = {
            name: '',
            lat: Number,
            lng: Number,
            draggable: Boolean
        };
        console.log('MarkerService Initialized...');
        _this.load();
        return _this;
    }
    GooglMapService.prototype.getMarkers = function () {
        var markers = JSON.parse(localStorage.getItem('markers'));
        return markers;
    };
    GooglMapService.prototype.addMarker = function (newMarker) {
        // Fetch markers
        var markers = JSON.parse(localStorage.getItem('markers'));
        //push to array
        markers.push(newMarker);
        // Set ls markers again
        localStorage.setItem('markers', JSON.stringify(markers));
    };
    GooglMapService.prototype.updateMarker = function (marker, newLat, newLng) {
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
    };
    GooglMapService.prototype.removeMarker = function (marker) {
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
    };
    GooglMapService.prototype.pasreJasonShopsList = function (shops) {
        console.log("parsing shops:");
        console.log(shops);
        for (var _i = 0, _a = shops.callback; _i < _a.length; _i++) {
            var shop = _a[_i];
            console.log(shop);
            var newShopMarker = {
                name: shop.shopBranchName,
                lat: shop.lat,
                lng: shop.lng,
                draggable: false
            };
            console.log(newShopMarker);
            this.markers.push(newShopMarker);
        }
        console.log("The markers are: " + this.markers);
        return this.markers;
    };
    return GooglMapService;
}(Init));
GooglMapService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], GooglMapService);
export { GooglMapService };
//# sourceMappingURL=C:/Users/Lioran/WebstormProjects/SupermarketProject/angular-src/src/app/services/google-maps/google-map.service.js.map