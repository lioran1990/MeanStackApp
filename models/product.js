/**
 * Created by Lioran on 6/14/2017.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Product Schema
const ProductSchema = mongoose.Schema({

    serialNumber: {
        type: Number,min :0,
        required: true,
    },
    productName: {
        type: String,validate: /[a-z]/,
        required: true
    },
    productCategory: {
        type: String,validate: /[a-z]/,
        required: true
    },
    weightable: {
        type: Boolean, enum: ['true','false'],
        required: true
    },
    productPrice: {
        type: Number,min :0,
        required: true
    },
    productManufacturer: {
        type: String,validate: /[a-z]/,
        required: true
    },
    productStoreID: {
        type: Number,min :0,
        required: true
    },
});

const Product = module.exports = mongoose.model('Product', ProductSchema);

module.exports.getProductBySerialNum = function(serialNum, callback){
    Product.findById(serialNum, callback);

}

module.exports.getAllProducts = function({},callback) {
    console.log("in get all products")
    Product.find({},function (err, products) {
        console.log("in find")
        if (err) {
            console.log("cant find");
        } else {
            console.log("success")
            console.log()
            return callback(false,products);
        }
    });
}

var productCreator = function () {
    this.serialNumber = {};
    this.productName = '';
    this.productCategory = '';
    this.weightable = Boolean;
    this.productPrice = {};
    this.productManufacturer = '';
    this.productStoreID = {};


};

//Dairy  products
var productNum1 =  new productCreator();
productNum1.serialNumber = 1;
productNum1.productName = 'milk';
productNum1.productCategory = 'Dairy';
productNum1.weightable = false;
productNum1.productPrice = 8;
productNum1.productManufacturer = 'tnova';
productNum1.productStoreID = 10;


var productNum2 =  new productCreator();
productNum2.serialNumber = 2;
productNum2.productName = 'Yogurt';
productNum2.productCategory = 'Dairy ';
productNum2.weightable = false;
productNum2.productPrice = 9;
productNum2.productManufacturer = 'tnova';
productNum2.productStoreID = 10;


var productNum3 =  new productCreator();
productNum3.serialNumber = 3;
productNum3.productName = 'Cheese';
productNum3.productCategory = 'Dairy';
productNum3.weightable = false;
productNum3.productPrice = 7;
productNum3.productManufacturer = 'tnova';
productNum3.productStoreID = 10;


var productNum4 =  new productCreator();
productNum4.serialNumber = 4;
productNum4.productName = 'Chocolate';
productNum4.productCategory = 'Dairy';
productNum4.weightable = false;
productNum4.productPrice = 4;
productNum4.productManufacturer = 'tnova';
productNum4.productStoreID = 10;


var productNum5 =  new productCreator();
productNum5.serialNumber = 5;
productNum5.productName = 'Cream';
productNum5.productCategory = 'Dairy';
productNum5.weightable = false;
productNum5.productPrice = 5;
productNum5.productManufacturer = 'tnova';
productNum5.productStoreID = 10;


//Meat products
var productNum6 =  new productCreator();
productNum6.serialNumber = 6;
productNum6.productName = 'prime rib';
productNum6.productCategory = 'Meat';
productNum6.weightable = true;
productNum6.productPrice = 8;
productNum6.productManufacturer = 'Red red';
productNum6.productStoreID = 10;


var productNum7 =  new productCreator();
productNum7.serialNumber = 7;
productNum7.productName = 'Sirloin';
productNum7.productCategory = 'Meat';
productNum7.weightable = true;
productNum7.productPrice = 7;
productNum7.productManufacturer = 'Red red';
productNum7.productStoreID = 10;


var productNum8 =  new productCreator();
productNum8.serialNumber = 8;
productNum8.productName = 'Kebab';
productNum8.productCategory = 'Meat';
productNum8.weightable = true;
productNum8.productPrice = 9;
productNum8.productManufacturer = 'Red red';
productNum8.productStoreID = 10;


var productNum9 =  new productCreator();
productNum9.serialNumber = 9;
productNum9.productName = 'Hot dogs';
productNum9.productCategory = 'Meat';
productNum9.weightable = true;
productNum9.productPrice = 6;
productNum9.productManufacturer = 'Red red';
productNum9.productStoreID = 10;


var productNum10 =  new productCreator();
productNum10.serialNumber = 10;
productNum10.productName = 'Flaps';
productNum10.productCategory = 'Meat';
productNum10.weightable = true;
productNum10.productPrice = 9;
productNum10.productManufacturer = 'Red red';
productNum10.productStoreID = 10;

//Vegetables
var productNum11 =  new productCreator();
productNum11.serialNumber = 11;
productNum11.productName = 'Cucumber';
productNum11.productCategory = 'Vegetables';
productNum11.weightable = true;
productNum11.productPrice = 3;
productNum11.productManufacturer = 'fruit cylinder';
productNum11.productStoreID = 10;


var productNum12 =  new productCreator();
productNum12.serialNumber = 12;
productNum12.productName = 'Tomato';
productNum12.productCategory = 'Vegetables';
productNum12.weightable = true;
productNum12.productPrice = 2;
productNum12.productManufacturer = 'fruit cylinder';
productNum12.productStoreID = 10;


var productNum13 =  new productCreator();
productNum13.serialNumber = 13;
productNum13.productName = 'Onion';
productNum13.productCategory = 'Vegetables';
productNum13.weightable = true;
productNum13.productPrice = 1;
productNum13.productManufacturer = 'fruit cylinder';
productNum13.productStoreID = 10;


var productNum14 =  new productCreator();
productNum14.serialNumber = 14;
productNum14.productName = 'Gamba';
productNum14.productCategory = 'Vegetables';
productNum14.weightable = true;
productNum14.productPrice = 6;
productNum14.productManufacturer = 'fruit cylinder';
productNum14.productStoreID = 10;


var productNum15 =  new productCreator();
productNum15.serialNumber = 15;
productNum15.productName = 'Sweet potato';
productNum15.productCategory = 'Vegetables';
productNum15.weightable = true;
productNum15.productPrice = 4;
productNum15.productManufacturer = 'fruit cylinder';
productNum15.productStoreID = 10;


var product1 = new Product(productNum1);
var product2 = new Product(productNum2);
var product3 = new Product(productNum3);
var product4 = new Product(productNum4);
var product5 = new Product(productNum5);
var product6 = new Product(productNum6);
var product7 = new Product(productNum7);
var product8 = new Product(productNum8);
var product9 = new Product(productNum9);
var product10 = new Product(productNum10);
var product11 = new Product(productNum11);
var product12 = new Product(productNum12);
var product13 = new Product(productNum13);
var product14 = new Product(productNum14);
var product15 = new Product(productNum15);


var ProductCollection =
    [product1, product2, product3, product4, product5,
        product6, product7, product8, product9, product10,
        product11, product12, product13, product14, product15];

module.exports.saveProducts = function(callback){
    try{
        for (var i=0; i<ProductCollection.length; i++){
            ProductCollection[i].save();
        }
        console.log(ProductCollection);
        return callback(true);
    } catch (err){
        return callback(false);
    }
}

module.exports.deleteProduct = function(product, callback){

    Product.remove({serialNumber:product.serialNumber},function (err,callback) {
        if(err){
            console.log('error');
        }else {
            return callback;
        }
    });
    return callback(false,null);
}

module.exports.updateProduct = function(newProduct, callback){
    Product.findOneAndUpdate({serialNumber:newProduct.serialNumber},{$set:{productCategory:newProduct.productCategory,productName:newProduct.productName,weightable:newProduct.weightable,productPrice:newProduct.productPrice,productManufacturer:newProduct.productManufacturer,productStoreID:newProduct.productStoreID}},{new:true},function (err,doc) {
        if(err){
            console.log('Something wrong when updating data!');
        }
        return callback(false,doc);
    });
}

module.exports.searchProductsNameCategoryAndPrice= function(product, callback){

    Product.find({
        productPrice:{$lt:product.price},
        productName:{"$regex" : product.name, "$options" : "i"},
        productCategory:{"$regex" : product.category, "$options" : "i"}
    },callback);
}


module.exports.addProduct = function(newProduct, callback){
    newProduct.save(callback);
}

//Product.saveProducts();
//module.exports = router;
