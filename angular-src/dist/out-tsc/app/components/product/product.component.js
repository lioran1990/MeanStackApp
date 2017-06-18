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
var ProductComponent = (function () {
    function ProductComponent() {
    }
    ProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        var path = "products/list";
        console.log('list comp ng oninit');
        this.authService.httpGet(path).subscribe(function (data) {
            if (data.success) {
                _this.products = _this.productService.pasreJasonProductList({ data: data });
                console.log('list comp', _this.products);
                _this.flashMessage.show('Success to bring the products from DB ', { cssClass: 'alert-success', timeout: 5000 });
            }
            else {
                console.log("im here!!");
            }
        });
        this.ngOnDestroy();
    };
    return ProductComponent;
}());
ProductComponent = __decorate([
    Component({
        selector: 'app-product',
        templateUrl: './products.component.html',
        styleUrls: ['./products.component.css']
    }),
    __metadata("design:paramtypes", [])
], ProductComponent);
export { ProductComponent };
//# sourceMappingURL=C:/Users/Lioran/WebstormProjects/SupermarketProject/angular-src/src/app/components/products/products.component.js.map
