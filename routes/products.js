/**
 * Created by Lioran on 6/14/2017.
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config/database');
const Product = require('../models/product');

var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;


router.get('/init',(req,res,next) => {
    console.log("In Router");
    Product.saveProducts(function (err) {
        if (err) {
            console.log(callback);
            res.json({success: false, msg: 'Failed to insert products to DB!'});
        } else {
            console.log("inSuccess");
            //console.log(result);
            res.json({success: true, msg: 'Dummy products inserted to DB! '});
        }
    });
});

router.get('/list', (req, res, next) => {
    console.log("In Router");
    Product.getAllProducts({}, function (err, callback) {
        if (err) {
            console.log(callback)
            res.json({success: false, msg: 'Failed fetching all products'});
        } else {
            console.log("inSuccess");
            res.json({callback, success: true, msg: 'Listing products '});
        }
    });
});

router.get('/categoryCount',(req,res,next) => {
    console.log("In Router");
Product.getCategoryCounts({},function(err,callback){
    if(err){
        console.log(callback)
        res.json({success: false, msg:'Failed to get stats'});
    }else{
        console.log("inSuccess");
        res.json({callback,success:true, msg:'Showing stats '});
    }
 });
});

router.post('/delete', (req, res, next) => {
    console.log("In Delete");

    let newProduct = new Product({
        serialNumber: req.body.serialNumber,
        productName: req.body.productName,
        productCategory: req.body.productCategory,
        weightable: req.body.weightable,
        productPrice: req.body.productPrice,
        productManufacturer: req.body.productManufacturer,
        productStoreID: req.body.productStoreID,
    });
    console.log(newProduct);
    Product.deleteProduct(newProduct, function (err, callback) {
        if (err) {
            //console.log(callback);
            res.json({success: false, msg: 'Failed to Delete product'});
        } else {
            console.log("inSuccess- server side!!!!");
            res.json({success: true, msg: 'Success To delete product '});
        }
    });
});

router.post('/update', (req, res, next) => {
    console.log("In Update");

    let newProduct = new Product({
        serialNumber: req.body.serialNumber,
        productName: req.body.productName,
        productCategory: req.body.productCategory,
        weightable: req.body.weightable,
        productPrice: req.body.productPrice,
        productManufacturer: req.body.productManufacturer,
        productStoreID: req.body.productStoreID,
    });

    let isProductValid = validateProduct(newProduct);
    if (isProductValid) {
        Product.updateProduct(newProduct, function (err, callback) {
            if (err) {
                console.log(callback)
                res.json({success: false, msg: 'Failed to update product'})
            } else {
                console.log("inSuccess");
                res.json({callback, success: true, msg: 'Success TO Update product '});
            }
        });
    } else {
        return res.json({success: false, msg: 'Invalid parameters'})
    }

});

function validateProduct(product) {
    console.log(product);
    console.log(isNaN(product.productPrice));
    console.log(isNaN(product.productStoreID));
    // return product.productPrice instanceof Number && product.productStoreID instanceof Number;
    return !isNaN(product.productPrice) && !isNaN(product.productStoreID);
}

//create
router.post('/create', (req, res, next) => {
    console.log("server side!!")
    let newProduct = new Product({
        serialNumber: req.body.serialNumber,
        productName: req.body.productName,
        productCategory: req.body.productCategory,
        weightable: req.body.weightable,
        productPrice: req.body.productPrice,
        productManufacturer: req.body.productManufacturer,
        productStoreID: req.body.productStoreID,
    });

    if (validateProduct(newProduct)) {
        console.log(newProduct);
        Product.addProduct(newProduct, (err, product) => {
            if (err) {
                console.log("problem");
                res.json({success: false, msg: 'Failed to create product'});
            } else {
                res.json({success: true, msg: 'Product Created'});
            }
        });
    } else {
        return res.json({success: false, msg: 'Invalid parameters'})
    }

});

router.post('/search', (req, res, next) => {
    console.log("In Search");
    console.log(req.body);
    const product = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price
    };

    if (product.price == '') {
        product.price = 1000000;
    }
    Product.searchProductsNameCategoryAndPrice(product, function (err, callback) {
        if (err) {
            console.log(callback)
            res.json({success: false, msg: 'Failed fetching all products'})
        } else {
            console.log("inSuccess");
            res.json({callback, success: true, msg: 'Listing product '});
        }
    });
});

router.get('/productCategoryList', (req, res, next) => {
    console.log("In productCategoryList ");
    
    var db = new Db('app', new Server('localhost', 27017));
    // Establish connection to db
    db.open(function(err, db) {

        // Crete the collection for the distinct example
        db.collection('products', function(err, collection) {  

            // Peform a distinct query against the a field
            collection.distinct('productCategory', function(err, productCategories) {
                if (err) {
                    console.log(err)
                    res.json({success: false, msg: 'Failed fetching product catagories'});
                } else {
                    console.log(productCategories);
                    res.json({productCategories, success: true, msg: 'Listing product catagories'});
                }
            });
        })
    });
});

module.exports = router;