import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Product} from "../../product";
import {ProductService} from "../../../../services/product.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html'
})
export class UpdateComponent implements OnInit {


  private serial : number;
  private route$ : Subscription;
  private product:  Product;
  myForm: FormGroup;

  constructor(private route : ActivatedRoute,private productService:ProductService,private formBuilder: FormBuilder, private flashMessage:FlashMessagesService,private authService:AuthService, private router:Router ) {

  }

  ngOnInit() {
    this.route$ = this.route.params.subscribe(
      (params : Params) => {
        this.serial = +params["serial"];
        this.displayProduct(this.serial);

        console.log(this.product);

        this.myForm = this.formBuilder.group({
          'serialNumber': [this.product.serial],
          'productName': [this.product.name],
          'productCategory': [this.product.category],
          'weightable': [this.product.weightable],
          'productPrice': [this.product.price],
          'productManufacturer': [this.product.manufacturer],
          'productStoreName': [this.product.storeName],
        });

      }
    );

  }

  onUpdateProduct(){
    this.product = new Product(
      this.myForm.get('serialNumber').value,
      this.myForm.get('productName').value,
      this.myForm.get('productCategory').value,
      this.myForm.get('weightable').value,
      this.myForm.get('productPrice').value,
      this.myForm.get('productManufacturer').value,
      this.myForm.get('productStoreName').value,
    )

    const product= {
      serialNumber : this.myForm.get('serialNumber').value,
      productName : this.myForm.get('productName').value,
      productCategory : this.myForm.get('productCategory').value,
      weightable : this.myForm.get('weightable').value,
      productPrice : this.myForm.get('productPrice').value,
      productManufacturer : this.myForm.get('productManufacturer').value,
      productStoreName : this.myForm.get('productStoreName').value,
    }


    const path = 'products/update';
    // Register user
    this.authService.httpPost(product,path).subscribe(data => {
      if(data.success){
        this.productService.updateProduct(this.product);

        this.flashMessage.show('Product has been changed!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/product']);

      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
      }

    });

  }

  exampleValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value === 'Example') {
      return {example: true};
    }
    return null;
  }
  errorMessage(msg:string){
    this.flashMessage.show('Please use a valid email',{cssClass:'alert-danger',timeout:3000});
  }



  displayProduct(serial){
    this.product = this.productService.getProductBySerial(serial);
  }

}
