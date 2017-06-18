import { Component,Injectable } from '@angular/core';
import {Product} from "../components/products/product";
import {AuthService} from "./auth.service";
import {Http, Headers} from '@angular/http';


@Injectable()
export class ProductService {
  newProductList : Product[] = new Array;
  product : Product;
  constructor(private http:Http) { }


  parseJsonSingleProduct(product){
    product = new Product(product.serialNumber,product.productName,product.productCategory,product.weightable,product.productPrice,product.productManufacturer,product.productStoreID);
    return product;
  }

  parseJasonProductList(productList){

    let newProduct : Product;
    let i : number =0;
    console.log(productList.data.callback);
    for(let product of productList.data.callback){
      newProduct = this.parseJsonSingleProduct(product)
      this.newProductList[i] = newProduct;

      i++;
    }
    return this.newProductList;

  }
//get all products by http GET request. no parameters needed
  httpGetList(path){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/'+path,{headers: headers})
      .map(res => res.json());
  }


  deleteProduct(deleteProduct){

    let i : number =0;
    for(let product of this.newProductList){
      if(product.serial == deleteProduct.serial){
        this.newProductList.splice(i,1);
      }
      i++;
    }
  }

  getProductBySerial(serial:number){

    for(let product of this.newProductList){
      if(product.serial==serial){
        return product;
      }

    }
    return undefined;
  }

  updateProduct(updateProduct){
    let i : number =0;
    for(let product of this.newProductList){
      if(product.serial == updateProduct.serial){
        this.newProductList[i] = updateProduct;
      }
      i++;
    }
  }

  pasreJasonProductListSearch(productList){
    let  list : Product[] = new Array;
    let newProduct : Product;
    let i : number =0;
    console.log(productList.data.callback);
    for(let product of productList.data.callback){
      newProduct = this.pasrseJsonSingleProduct(product)
      list[i] = newProduct;
      i++;
    }
    console.log("in pasreJasonProductListSearch");
    console.log(list);
    return list;
  }

  pasrseJsonSingleProduct(product){
    product = new Product(product.serialNumber,product.productName,product.productCategory,product.weightable,product.productPrice,product.productManufacturer,product.productStoreID);
    return product;
  }

}
