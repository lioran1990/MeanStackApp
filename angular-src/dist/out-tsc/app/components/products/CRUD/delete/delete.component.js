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
import { AuthService } from "../../../../services/auth.service";
import { ProductService } from "../../../../services/product.service";
import { FlashMessagesService } from "angular2-flash-messages";
var DeleteComponent = (function () {
    function DeleteComponent(router, productService, flashMessage, authService, route) {
        this.router = router;
        this.productService = productService;
        this.flashMessage = flashMessage;
        this.authService = authService;
        this.route = route;
    }
    DeleteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route$ = this.router.params.subscribe(function (params) {
            _this.serial = +params["serial"];
            _this.product = _this.productService.getProductBySerial(_this.serial);
            _this.productService.deleteProduct(_this.product);
            console.log('delete comp ng on init', _this.product);
            _this.deleteProduct(_this.product);
        });
    };
    DeleteComponent.prototype.deleteProduct = function (product) {
        var _this = this;
        var path = 'products/delete';
        var newProduct = {
            serialNumber: product.serial,
            productName: product.name,
            productCategory: product.category,
            weightable: product.weightable,
            productPrice: product.price,
            productManufacturer: product.manufacturer,
            productStoreID: product.storeID,
        };
        console.log('check this out!');
        this.authService.httpPost(newProduct, path).subscribe(function (data) {
            if (data.success) {
                console.log(data, "Product has been deleted!");
                _this.route.navigate(['/product']);
                _this.flashMessage.show('The product ' + newProduct.productName + ' is now deleted', { cssClass: 'alert-success', timeout: 3000 });
            }
            else {
                console.log("Product did not deleted! ");
            }
        });
    };
    return DeleteComponent;
}());
DeleteComponent = __decorate([
    Component({
        selector: 'app-delete',
        templateUrl: './delete.component.html',
        styleUrls: ['./delete.component.css']
    }),
    __metadata("design:paramtypes", [ActivatedRoute, ProductService, FlashMessagesService, AuthService, Router])
], DeleteComponent);
export { DeleteComponent };
//# sourceMappingURL=C:/Users/Lioran/WebstormProjects/SupermarketProject/angular-src/src/app/components/products/CRUD/delete/delete.component.js.map