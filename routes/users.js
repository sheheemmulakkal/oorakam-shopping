var express = require('express');
const { response } = require('../app');
const { getGoldRate } = require('../helpers/product-helpers');

const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var userHelpers = require('../helpers/user-helpers')


/* GET users listing. */
router.get('/',async function(req, res, next) {
  let user=req.session.user
  
  let goldRate=await productHelpers.getGoldRate()
  console.log(goldRate);
  productHelpers.getAllProducts().then((products)=>{
    res.render('user/user-home',{products,user,goldRate});
  })


});

router.get('/login', (req,res)=>{
 res.render('user/login')
})

router.post('/login',(req,res)=>{
 
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
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
  userHelpers.doSignup(req.body).then((response)=>{
    res.redirect('/')
  })
 
})


router.get('/logout',(req,res)=>{
  req.session.user=null
  res.redirect('/')
})
module.exports = router;
