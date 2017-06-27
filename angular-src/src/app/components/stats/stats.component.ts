import { Component,OnDestroy, OnInit,Input } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Product} from "../Products/product";
import {productCatStats} from "../Stats/productCatStats";
import {StatsCountComponent} from "../Stats/stats-count.component";

const d3 = require('d3');
const d3Scale = require('d3-scale');
const d3Shape = require('d3-shape');

@Component({
  selector: 'app-product-stats',
  template: `    
    <h1>{{title}}</h1>
    <h2 class="page-header">{{subtitle}}</h2>
    <svg width="1152" height="600"></svg>
  `
})
export class StatsComponent implements OnInit {

  title = 'Products Count Statistics by Category';
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
    this.width = (900 - this.margin.left - this.margin.right)*1.2 ;
    this.height = (500 - this.margin.top - this.margin.bottom)*1.2;
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
      .innerRadius(180);
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
    //g.append("text").attr("transform", (d: any) => "translate(" + this.labelArc.centroid(d) + ")")
    g.append("text")
      .attr("innerRadius", (d: any) => 0)
      .attr("outerRadius", (d: any) => 500)
      .attr("transform", (d: any) => "translate(" + this.labelArc.centroid(d) + ")")
      //.attr("transform", function(d) {                    //set the label's origin to the center of the arc
        //we have to make sure to set these before calling arc.centroid
        //d.innerRadius = 0;
       // d.outerRadius = 500;
        //return "translate(" + this.labelArc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
      //})
      //.attr("transform", function(d) { //set the label's origin to the center of the arc
        //we have to make sure to set these before calling arc.centroid
       // d.outerRadius = 100; // Set Outer Coordinate
       // d.innerRadius = 145; // Set Inner Coordinate
       /// return "translate(" + this.labelArc.centroid(d) + ")";
      //})
     // .attr("dy", ".85em")
      .attr("dx", "-2.85em")
      .text((d: any) => d.data._id.toString());
  }

}
