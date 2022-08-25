var express = require('express');
var router = express.Router();
var userHelpers = require('../helpers/user-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  let products = [
    {
      proId:'product-1',
      title: 'new title 1',
      price:'50',
      image: "https://www.kalyanjewellers.net/images/Jewellery/Gold/images/rebha-sankalp-gold-necklace.jpg"
    },
    {
      proId:'product-2',
      title: 'new title 2',
      price:'40',
      image: "https://3.imimg.com/data3/IP/NG/MY-11695756/gold-ornament-500x500.jpg"
    },
    {
      proId:'product-3',
      title: 'new title 2',
      price:'40',
      image: "https://i.pinimg.com/564x/ec/30/c7/ec30c71d641152e7e04190f31fd7800f.jpg"
    },
    {
      proId:'product-4',
      title: 'new title 2',
      price:'40',
      image: "https://staticimg.titan.co.in/Tanishq/Catalog/501819DQMABA00_1.jpg?impolicy=pqmed&imwidth=640"
    },
    {
      proId:'product-5',
      title: 'new title 2',
      price:'40',
      image: "https://i.pinimg.com/564x/ec/30/c7/ec30c71d641152e7e04190f31fd7800f.jpg"
    },
    {
      proId:'product-6',
      title: 'new title 2',
      price:'40',
      image: "https://cdn.shopify.com/s/files/1/0553/5422/8922/files/banner-1_3_400x.jpg?v=1632899102"
    }
  ]
  res.render('user/user-home',{products});
});

module.exports = router;
