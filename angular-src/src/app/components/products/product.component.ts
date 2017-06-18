import { Component,OnDestroy, OnInit,Input } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Product} from "./product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  products: Product[] = new Array;

  constructor(private flashMessage:FlashMessagesService,private productService:ProductService,private authService: AuthService) { }

  ngOnInit() {

    const path = "products/list";

    console.log('list comp ng oninit');
    this.productService.httpGetList(path).subscribe(data => {
      if(data.success){

        this.products = this.productService.parseJasonProductList({data});

        console.log('list comp',this.products);
        if(!this.products){
          this.flashMessage.show('Success to bring the products from DB ', {cssClass: 'alert-success', timeout: 5000});
        }
      } else {
        console.log("im here!!")

      }
    });
    this.ngOnDestroy();
  }

ngOnDestroy(){
  this.products = [];
}

}
