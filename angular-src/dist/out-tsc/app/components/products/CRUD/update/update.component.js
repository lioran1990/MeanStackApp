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
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../../product";
import { ProductService } from "../../../../services/product.service";
import { FormBuilder } from "@angular/forms";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../../../../services/auth.service";
var UpdateComponent = (function () {
    function UpdateComponent(route, productService, formBuilder, flashMessage, authService, router) {
        this.route = route;
        this.productService = productService;
        this.formBuilder = formBuilder;
        this.flashMessage = flashMessage;
        this.authService = authService;
        this.router = router;
    }
    UpdateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route$ = this.route.params.subscribe(function (params) {
            _this.serial = +params["serial"];
            _this.displayProduct(_this.serial);
            console.log(_this.product);
            _this.myForm = _this.formBuilder.group({
                'serialNumber': [_this.product.serial],
                'productName': [_this.product.name],
                'productCategory': [_this.product.category],
                'weightable': [_this.product.weightable],
                'productPrice': [_this.product.price],
                'productManufacturer': [_this.product.manufacturer],
                'productStoreID': [_this.product.storeID],
            });
        });
    };
    UpdateComponent.prototype.onUpdateProduct = function () {
        var _this = this;
        this.product = new Product(this.myForm.get('serialNumber').value, this.myForm.get('productName').value, this.myForm.get('productCategory').value, this.myForm.get('weightable').value, this.myForm.get('productPrice').value, this.myForm.get('productManufacturer').value, this.myForm.get('productStoreID').value);
        var product = {
            serialNumber: this.myForm.get('serialNumber').value,
            productName: this.myForm.get('productName').value,
            productCategory: this.myForm.get('productCategory').value,
            weightable: this.myForm.get('weightable').value,
            productPrice: this.myForm.get('productPrice').value,
            productManufacturer: this.myForm.get('productManufacturer').value,
            productStoreID: this.myForm.get('productStoreID').value,
        };
        var path = 'products/update';
        // Register user
        this.authService.httpPost(product, path).subscribe(function (data) {
            if (data.success) {
                _this.productService.updateProduct(_this.product);
                _this.flashMessage.show('Product has been changed!', { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['/product']);
            }
            else {
                _this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
            }
        });
    };
    UpdateComponent.prototype.exampleValidator = function (control) {
        if (control.value === 'Example') {
            return { example: true };
        }
        return null;
    };
    UpdateComponent.prototype.errorMessage = function (msg) {
        this.flashMessage.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
    };
    UpdateComponent.prototype.displayProduct = function (serial) {
        this.product = this.productService.getProductBySerial(serial);
    };
    return UpdateComponent;
}());
UpdateComponent = __decorate([
    Component({
        selector: 'app-update',
        templateUrl: './update.component.html'
    }),
    __metadata("design:paramtypes", [ActivatedRoute, ProductService, FormBuilder, FlashMessagesService, AuthService, Router])
], UpdateComponent);
export { UpdateComponent };
//# sourceMappingURL=C:/Users/Lioran/WebstormProjects/SupermarketProject/angular-src/src/app/components/products/CRUD/update/update.component.js.map