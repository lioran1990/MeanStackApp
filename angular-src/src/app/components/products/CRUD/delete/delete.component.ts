import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {ProductService} from "../../../../services/product.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Subscription} from "rxjs";
import {Product} from "../../product";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  private serial : number;
  private route$ : Subscription;
  private product:  Product;
  constructor(private router : ActivatedRoute,private productService:ProductService, private flashMessage:FlashMessagesService,private authService:AuthService, private route:Router) { }

  ngOnInit() {
    this.route$ = this.router.params.subscribe(
      (params : Params) => {
        this.serial = +params["serial"];
        this.product = this.productService.getProductBySerial(this.serial);
        this.productService.deleteProduct(this.product);
        console.log('delete comp ng on init',this.product);
        this.deleteProduct(this.product);

      }
    );
  }

  deleteProduct(product){
    const path = 'products/delete';

    const newProduct= {
      serialNumber : product.serial,
      productName : product.name,
      productCategory : product.category,
      weightable : product.weightable,
      productPrice : product.price,
      productManufacturer : product.manufacturer,
      productStoreID : product.storeID,
    }
    console.log('check this out!');
    this.authService.httpPost(newProduct,path).subscribe(data => {
      if(data.success){
        console.log(data,"Product has been deleted!");
        this.route.navigate(['/product']);
        this.flashMessage.show('The product '+ newProduct.productName+ ' is now deleted', {cssClass: 'alert-success', timeout: 3000});
      } else {
        console.log("Product did not deleted! ");
      }
    });

  }

}
