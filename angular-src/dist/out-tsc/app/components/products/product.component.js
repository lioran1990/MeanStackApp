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
import { ProductService } from "../../services/product.service";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
var ProductComponent = (function () {
    function ProductComponent(flashMessage, productService, authService) {
        this.flashMessage = flashMessage;
        this.productService = productService;
        this.authService = authService;
        this.products = new Array;
    }
    ProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        var path = "products/list";
        console.log('list comp ng oninit');
        this.productService.httpGetList(path).subscribe(function (data) {
            if (data.success) {
                _this.products = _this.productService.parseJasonProductList({ data: data });
                console.log('list comp', _this.products);
                if (!_this.products) {
                    _this.flashMessage.show('Success to bring the products from DB ', { cssClass: 'alert-success', timeout: 5000 });
                }
            }
            else {
                console.log("im here!!");
            }
        });
        this.ngOnDestroy();
    };
    ProductComponent.prototype.ngOnDestroy = function () {
        this.products = [];
    };
    return ProductComponent;
}());
ProductComponent = __decorate([
    Component({
        selector: 'app-product',
        templateUrl: './product.component.html',
        styleUrls: ['./product.component.css']
    }),
    __metadata("design:paramtypes", [FlashMessagesService, ProductService, AuthService])
], ProductComponent);
export { ProductComponent };
//# sourceMappingURL=C:/Users/Lioran/WebstormProjects/SupermarketProject/angular-src/src/app/components/products/product.component.js.map