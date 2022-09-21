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

router.get('/login', (req,res)=>{
 res.render('user/login')
})

router.post('/login',(req,res)=>{
  console.log(req.body);
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      res.redirect('/')
    }else{
      res.redirect("login")
    }
  })
 
})


router.get('/signup',(req,res)=>{
  res.render('user/signup')
})

router.post('/signup',(req,res)=>{
  console.log(req.body);
  userHelpers.doSignup(req.body).then((response)=>{
    console.log('hhiii');
    res.redirect('/')
  })
 
})
module.exports = router;
