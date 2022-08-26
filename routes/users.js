var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var userHelpers = require('../helpers/user-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    console.log(products._id);
    res.render('user/user-home',{products});
  })
});

module.exports = router;
