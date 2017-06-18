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
import { FormBuilder } from "@angular/forms";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../../../../services/auth.service";
import { Router } from "@angular/router";
import { Product } from "../../product";
var CreateComponent = (function () {
    function CreateComponent(formBuilder, flashMessage, authService, router) {
        this.formBuilder = formBuilder;
        this.flashMessage = flashMessage;
        this.authService = authService;
        this.router = router;
        this.myForm = formBuilder.group({
            'serialNumber': [''],
            'productName': [''],
            'productCategory': [''],
            'weightable': [''],
            'productPrice': [''],
            'productManufacturer': [''],
            'productStoreID': [''],
        });
    }
    CreateComponent.prototype.onCreateProduct = function () {
        var _this = this;
        this.product = new Product(this.myForm.get('serialNumber').value, this.myForm.get('productName').value, this.myForm.get('productCategory').value, this.myForm.get('weightable').value, this.myForm.get('productPrice').value, this.myForm.get('productManufacturer').value, this.myForm.get('productStoreID').value);
        console.log(this.myForm);
        var product = {
            serialNumber: this.myForm.get('serialNumber').value,
            productName: this.myForm.get('productName').value,
            productCategory: this.myForm.get('productCategory').value,
            weightable: this.myForm.get('weightable').value,
            productPrice: this.myForm.get('productPrice').value,
            productManufacturer: this.myForm.get('productManufacturer').value,
            productStoreID: this.myForm.get('productStoreID').value,
        };
        console.log(product);
        console.log("im here!!");
        var path = 'products/create';
        // Register user
        this.authService.httpPost(product, path).subscribe(function (data) {
            if (data.success) {
                _this.router.navigate(['/product']);
                _this.flashMessage.show('The product' + product.productName + 'is added', { cssClass: 'alert-success', timeout: 3000 });
            }
            else {
                console.log("im here!!");
                _this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
            }
        });
    };
    CreateComponent.prototype.exampleValidator = function (control) {
        if (control.value === 'Example') {
            return { example: true };
        }
        return null;
    };
    CreateComponent.prototype.errorMessage = function (msg) {
        this.flashMessage.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
    };
    CreateComponent.prototype.ngOnInit = function () {
    };
    return CreateComponent;
}());
CreateComponent = __decorate([
    Component({
        selector: 'app-create',
        templateUrl: './create.component.html'
    }),
    __metadata("design:paramtypes", [FormBuilder, FlashMessagesService, AuthService, Router])
], CreateComponent);
export { CreateComponent };
//# sourceMappingURL=C:/Users/Lioran/WebstormProjects/SupermarketProject/angular-src/src/app/components/products/CRUD/create/create.component.js.map