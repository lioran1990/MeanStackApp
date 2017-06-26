import { Component,OnDestroy, OnInit,Input } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Product} from "./product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})

export class ProductComponent implements OnInit {

  products: Product[] = new Array;
  productCategoriesToImages = {};

  constructor(private flashMessage:FlashMessagesService,private productService:ProductService,private authService: AuthService) { }

  ngOnInit() {

    const path = "products/list";

    console.log('list comp ng oninit');
    this.productService.httpGetList(path).subscribe(data => {
      if(data.success){
        console.log('bla bla lba'+data.success)

        this.products = this.productService.parseJasonProductList({data});

        console.log('list comp',this.products);
        if(!this.products){
          this.flashMessage.show('Success to bring the products from DB ', {cssClass: 'alert-success', timeout: 5000});
        }
      } else {
        console.log("im here!!")

      }
    });

    const categoriesPath = 'products/productCategoryList';

    this.productService.httpGetProductCategories(categoriesPath).subscribe(data => {
      if (data.success) {
        data.productCategories.forEach(element => {
          this.productCategoriesToImages[element] = '../../../shophomepage/photos/350x120_' + element + ".jpg";
        });
        console.log('Received productCategories');
      } else {
        console.log('Failed receiving product categories, keep it empty');
      }
    });

    this.ngOnDestroy();
  }

ngOnDestroy(){
  this.products = [];
}

}
