import { Component, OnInit } from '@angular/core';
import {Product} from "../../product";
import {FlashMessagesService} from "angular2-flash-messages";
import {ProductService} from "../../../../services/product.service";
import {AuthService} from "../../../../services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  myForm: FormGroup;

  products: Product[] = new Array;

  productName : string;
  productCategory : string;
  productPrice : number;

  productCategories : string[] = [];
  productCategoriesToImages = {};

  constructor(private formBuilder: FormBuilder,private flashMessage:FlashMessagesService,
    private productService:ProductService, private authService: AuthService, private router:Router) {
    this.myForm = formBuilder.group({
      'productName': [''],
      'productCategory': [''],
      'productPrice': [''],
    });
  }

  onSearch() {
    this.productName = this.myForm.get('productName').value;
    this.productCategory = this.myForm.get('productCategory').value;
    this.productPrice = this.myForm.get('productPrice').value;

    const object ={
      name: this.productName,
      category: this.productCategory,
      price: this.productPrice,
    };

    const path = 'products/search';


    this.authService.httpPost(object,path).subscribe(data => {
      if(data.success){
        this.products = this.productService.pasreJasonProductListSearch({data});
        console.log("in In Serach")
        console.log(this.products);
        this.flashMessage.show('Success to bring the products from DB ', {cssClass: 'alert-success', timeout: 5000});

      } else {

      }
    });

   

  }

  ngOnInit() {
    const path = "products/list";

    this.authService.httpGet(path).subscribe(data => {
      if(data.success){
        this.products = this.productService.pasreJasonProductListSearch({data});
        console.log('search comp',this.products);
        this.flashMessage.show('Success to collect  the products from DB ', {cssClass: 'alert-success', timeout: 5000});

      } else {
        console.log("im here!!")
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 5000});

      }
    });

    const categoriesPath = 'products/productCategoryList';

    this.productService.httpGetProductCategories(categoriesPath).subscribe(data => {
      if (data.success) {
        this.productCategories = data.productCategories;
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
