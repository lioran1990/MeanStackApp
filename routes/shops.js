const express = require('express');
const router = express.Router();
const Shop = require('../models/shops');



router.get('/list',(req,res,next) => {
    console.log("In Shop List");
    Shop.getAllShops({},function(err,callback){
        if(err){
            console.log(callback)
            res.json({success: false, msg:'Failed fetching all shops'})
        }else{
            console.log("inSuccess");
            res.json({callback,success:true, msg:'Listing shops '});
        }
    });
});



//--------------------------------------------------------------------------


router.get('/init',(req,res,next) => {
    console.log("In Router");
    Shop.saveShops(function(err){
        if(err){
            console.log(callback);
            res.json({success: false, msg:'Failed to insert shops to DB!'});
        }else{
            console.log("inSuccess");
            //console.log(result);
            res.json({success:true, msg:'Dummy shops inserted to DB! '});
        }
    });
});

module.exports = router;