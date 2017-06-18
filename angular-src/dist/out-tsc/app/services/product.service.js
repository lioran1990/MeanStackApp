var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Product } from "../components/products/product";
import { Http, Headers } from '@angular/http';
var ProductService = (function () {
    function ProductService(http) {
        this.http = http;
        this.newProductList = new Array;
    }
    ProductService.prototype.parseJsonSingleProduct = function (product) {
        product = new Product(product.serialNumber, product.productName, product.productCategory, product.weightable, product.productPrice, product.productManufacturer, product.productStoreID);
        return product;
    };
    ProductService.prototype.parseJasonProductList = function (productList) {
        var newProduct;
        var i = 0;
        console.log(productList.data.callback);
        for (var _i = 0, _a = productList.data.callback; _i < _a.length; _i++) {
            var product = _a[_i];
            newProduct = this.parseJsonSingleProduct(product);
            this.newProductList[i] = newProduct;
            i++;
        }
        return this.newProductList;
    };
    //get all products by http GET request. no parameters needed
    ProductService.prototype.httpGetList = function (path) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:3000/' + path, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ProductService.prototype.deleteProduct = function (deleteProduct) {
        var i = 0;
        for (var _i = 0, _a = this.newProductList; _i < _a.length; _i++) {
            var product = _a[_i];
            if (product.serial == deleteProduct.serial) {
                this.newProductList.splice(i, 1);
            }
            i++;
        }
    };
    ProductService.prototype.getProductBySerial = function (serial) {
        for (var _i = 0, _a = this.newProductList; _i < _a.length; _i++) {
            var product = _a[_i];
            if (product.serial == serial) {
                return product;
            }
        }
        return undefined;
    };
    ProductService.prototype.updateProduct = function (updateProduct) {
        var i = 0;
        for (var _i = 0, _a = this.newProductList; _i < _a.length; _i++) {
            var product = _a[_i];
            if (product.serial == updateProduct.serial) {
                this.newProductList[i] = updateProduct;
            }
            i++;
        }
    };
    ProductService.prototype.pasreJasonProductListSearch = function (productList) {
        var list = new Array;
        var newProduct;
        var i = 0;
        console.log(productList.data.callback);
        for (var _i = 0, _a = productList.data.callback; _i < _a.length; _i++) {
            var product = _a[_i];
            newProduct = this.pasrseJsonSingleProduct(product);
            list[i] = newProduct;
            i++;
        }
        console.log("in pasreJasonProductListSearch");
        console.log(list);
        return list;
    };
    ProductService.prototype.pasrseJsonSingleProduct = function (product) {
        product = new Product(product.serialNumber, product.productName, product.productCategory, product.weightable, product.productPrice, product.productManufacturer, product.productStoreID);
        return product;
    };
    return ProductService;
}());
ProductService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], ProductService);
export { ProductService };
//# sourceMappingURL=C:/Users/Lioran/WebstormProjects/SupermarketProject/angular-src/src/app/services/product.service.js.map