import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";
import {Product} from "../../product";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {
  myForm: FormGroup;
  product : Product;
  constructor(private formBuilder: FormBuilder, private flashMessage:FlashMessagesService,private authService:AuthService, private router:Router ) {
    this.myForm = formBuilder.group({
      'serialNumber': [''],
      'productName': [''],
      'productCategory': [''],
      'weightable': [''],
      'productPrice': [''],
      'productManufacturer': [''],
      'productStoreID': [''],
    });
  }

  onCreateProduct(){
    this.product = new Product(
      this.myForm.get('serialNumber').value,
      this.myForm.get('productName').value,
      this.myForm.get('productCategory').value,
      this.myForm.get('weightable').value,
      this.myForm.get('productPrice').value,
      this.myForm.get('productManufacturer').value,
      this.myForm.get('productStoreID').value,
    )

    console.log(this.myForm);
    const product= {
      serialNumber : this.myForm.get('serialNumber').value,
      productName : this.myForm.get('productName').value,
      productCategory : this.myForm.get('productCategory').value,
      weightable : this.myForm.get('weightable').value,
      productPrice : this.myForm.get('productPrice').value,
      productManufacturer : this.myForm.get('productManufacturer').value,
      productStoreID : this.myForm.get('productStoreID').value,
    }
    console.log(product);

    console.log("im here!!")
    const path = 'products/create'
    // Register user
    this.authService.httpPost(product,path).subscribe(data => {
      if(data.success){
        this.router.navigate(['/product']);
        this.flashMessage.show('The product'+product.productName+'is added', {cssClass: 'alert-success', timeout: 3000});

      } else {
        console.log("im here!!")
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



  ngOnInit() {
  }

}
