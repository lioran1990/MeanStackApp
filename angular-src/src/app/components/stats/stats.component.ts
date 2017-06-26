import { Component,OnDestroy, OnInit,Input } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Product} from "../Products/product";
import {productCatStats} from "../Stats/productCatStats";

const d3 = require('d3');
const d3Scale = require('d3-scale');
const d3Shape = require('d3-shape');

@Component({
  selector: 'app-product-stats',
  template: `
    <h1>{{title}}</h1>
    <h2>{{subtitle}}</h2>
    <svg width="960" height="500"></svg>
  `
})
export class StatsComponent implements OnInit {

  title = 'Products Statistics';
  subtitle = 'Pie Chart';

  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private radius: number;

  private arc: any;
  private labelArc: any;
  private pie: any;
  private color: any;
  private svg: any;

  stat: productCatStats;

  private Stats: any[] = [];

  constructor(private flashMessage:FlashMessagesService, private productService:ProductService) {
    this.width = 900 - this.margin.left - this.margin.right ;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;

  }



  ngOnInit() {

    console.log(this.Stats);

    let i: number = 0;
    var json = {};
    this.productService.httpGetList('products/categoryCount').subscribe(data => {
      for(let stat of data.callback) {
        stat = new productCatStats(stat._id, stat.count);
        console.log(stat);
        json = JSON.parse(JSON.stringify(stat));
        this.Stats.push(json);
        i++;

        this.initSvg();
        this.drawPie();
      };

    });

    console.log(this.Stats);

  }

  private initSvg() {
    this.color = d3Scale.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    this.arc = d3Shape.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(0);
    this.labelArc = d3Shape.arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40);
    this.pie = d3Shape.pie()
      .sort(null)
      .value((d: any) => d.count);
    this.svg = d3.select("svg")
      .append("g")
      .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
  }

  private drawPie() {
    let g = this.svg.selectAll(".arc")
      .data(this.pie(this.Stats))
      .enter().append("g")
      .attr("class", "arc");
    g.append("path").attr("d", this.arc)
      .style("fill", (d: any) => this.color(d.data._id) );
    g.append("text").attr("transform", (d: any) => "translate(" + this.labelArc.centroid(d) + ")")
      .attr("dy", ".35em")
      .text((d: any) => d.data._id.toString());
  }

}