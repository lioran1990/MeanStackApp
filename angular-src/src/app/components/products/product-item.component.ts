import {Component, OnInit, Input} from '@angular/core';
import {Product} from "./product";



@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent implements OnInit {


  constructor() {

  }

  @Input() product: Product;

  ngOnInit() {
  }


}
