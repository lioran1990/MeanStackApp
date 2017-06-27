const mongoose = require('mongoose');
const config = require('../config/database');

// Shop Schema
const ShopSchema = mongoose.Schema({

    storeId: {
        type: Number,
        required: true
    },
    shopBranchName: {
        type: String,
        required: true
    },
    shopCompany: {
        type: String,
        required: true
    },
    shopSize: {
        type: Number,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },

});

const Shop = module.exports = mongoose.model('Shop', ShopSchema);


var shopCreator = function () {
    this.storeId = {};
    this.shopBranchName = '';
    this.shopCompany = '';
    this.shopSize = {};
    this.lat = {};
    this.lng = {};
    this.rating = {};
    this.city = '';

};


var shopNum1 =  new shopCreator();
shopNum1.storeId = 1;
shopNum1.shopBranchName = 'Mahsaney Hashmal';
shopNum1.shopCompany = 'Mahsaney Hashmal';
shopNum1.shopSize = 5;
shopNum1.lat = 32.075869;
shopNum1.lng = 34.795875;
shopNum1.rating = '10';
shopNum1.city = 'Tel Aviv';



var shopNum2 =  new shopCreator();
shopNum2.storeId = 1;
shopNum2.shopBranchName = 'Traklin Hashmal';
shopNum2.shopCompany = 'Traklin Hashmal';
shopNum2.shopSize = 4;
shopNum2.lat = 32.074433;
shopNum2.lng = 34.795597;
shopNum2.rating = '5';
shopNum2.city = 'Tel Aviv';



var shopNum3 =  new shopCreator();
shopNum3.storeId = 1;
shopNum3.shopBranchName = 'Arena Mall';
shopNum3.shopCompany = 'Arena Mall';
shopNum3.shopSize = 3;
shopNum3.lat = 32.192284;
shopNum3.lng = 34.853500;
shopNum3.rating = '2';
shopNum3.city = 'Herzliya';

var shopNum4 =  new shopCreator();
shopNum4.storeId = 3;
shopNum4.shopBranchName = 'Ofer Grand Mall';
shopNum4.shopCompany = 'Ofer Grand Mall';
shopNum4.shopSize = 2;
shopNum4.lat = 31.250243;
shopNum4.lng = 34.771875;
shopNum4.rating = '1';
shopNum4.city = 'Beer Sheva';


var shopNum5 =  new shopCreator();
shopNum5.storeId = 2;
shopNum5.shopBranchName = 'Dizengoff Mall';
shopNum5.shopCompany = 'Dizengoff Mall';
shopNum5.shopSize = 4;
shopNum5.lat = 32.075346;
shopNum5.lng = 34.775395;
shopNum5.rating = '5';
shopNum5.city = 'Tel Aviv';

var shop1 = new Shop(shopNum1);
var shop2 = new Shop(shopNum2);
var shop3 = new Shop(shopNum3);
var shop4 = new Shop(shopNum4);
var shop5 = new Shop(shopNum5);


var shopCollection = [shop1,shop2,shop3,shop4,shop5];


module.exports.saveShops = function(callback){
    try{
        mongoose.connection.collections['shops'].drop( function(err) {
            console.log('Shops collection dropped');
            //Second- add the new collection
            for (var i=0; i<shopCollection.length; i++){
                shopCollection[i].save();
            }
        });
       // console.log(shopCollection);
        return callback(true);
    }
    catch(err){
        return callback(false);
    }
}


module.exports.getAllShops = function({},callback) {
    console.log("in get all shops")
    Shop.find({},function (err, products) {
        console.log("in find")
        if (err) {
            console.log("Cant find ");
           callback(false,products);
        } else {
            callback(false,products);
        }
    });

}

