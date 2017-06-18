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
import { FlashMessagesService } from "angular2-flash-messages";
import { ProductService } from "../../../../services/product.service";
import { AuthService } from "../../../../services/auth.service";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
var SearchComponent = (function () {
    function SearchComponent(formBuilder, flashMessage, productService, authService, router) {
        this.formBuilder = formBuilder;
        this.flashMessage = flashMessage;
        this.productService = productService;
        this.authService = authService;
        this.router = router;
        this.products = new Array;
        this.myForm = formBuilder.group({
            'productName': [''],
            'productCategory': [''],
            'productPrice': [''],
        });
    }
    SearchComponent.prototype.onSearch = function () {
        var _this = this;
        this.productName = this.myForm.get('productName').value;
        this.productCategory = this.myForm.get('productCategory').value;
        this.productPrice = this.myForm.get('productPrice').value;
        var object = {
            name: this.productName,
            category: this.productCategory,
            price: this.productPrice,
        };
        var path = 'products/search';
        this.authService.httpPost(object, path).subscribe(function (data) {
            if (data.success) {
                _this.products = _this.productService.pasreJasonProductListSearch({ data: data });
                console.log("in In Serach");
                console.log(_this.products);
                _this.flashMessage.show('Success to bring the products from DB ', { cssClass: 'alert-success', timeout: 5000 });
            }
            else {
            }
        });
    };
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        var path = "products/list";
        this.authService.httpGet(path).subscribe(function (data) {
            if (data.success) {
                _this.products = _this.productService.pasreJasonProductListSearch({ data: data });
                console.log('search comp', _this.products);
                _this.flashMessage.show('Success to collect  the products from DB ', { cssClass: 'alert-success', timeout: 5000 });
            }
            else {
                console.log("im here!!");
                _this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 5000 });
            }
        });
        this.ngOnDestroy();
    };
    SearchComponent.prototype.ngOnDestroy = function () {
        this.products = [];
    };
    return SearchComponent;
}());
SearchComponent = __decorate([
    Component({
        selector: 'app-search',
        templateUrl: './search.component.html'
    }),
    __metadata("design:paramtypes", [FormBuilder, FlashMessagesService, ProductService, AuthService, Router])
], SearchComponent);
export { SearchComponent };
//# sourceMappingURL=C:/Users/Lioran/WebstormProjects/SupermarketProject/angular-src/src/app/components/products/CRUD/search/search.component.js.map