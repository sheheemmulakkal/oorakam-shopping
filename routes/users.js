var express = require('express');
const session = require('express-session');
const { response } = require('../app');
const { getGoldRate } = require('../helpers/product-helpers');

const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var userHelpers = require('../helpers/user-helpers')

const verifyLogin=(req,res,next)=>{
  if(req.session.user){
     next()
  }else{
    res.redirect('/login')
  }
}

/* GET users listing. */
router.get('/',async function(req, res, next) {
  let user=req.session.user
  
  let goldRate=await productHelpers.getGoldRate({test:10})
  let rate = goldRate._id
  console.log(rate);
 


  productHelpers.getAllProducts().then((products)=>{
    
  
  
    console.log(products);
    res.render('user/user-home',{products,user,rate,value:5});
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

router.get('/cart',verifyLogin,(req,res)=>{
    productHelpers.getAllProducts().then((response)=>{
      console.log(response);
      res.render('user/cart',{status:true,response})
    })
 
})

router.get('/add-to-cart/:id',verifyLogin,(req,res)=>{
  userHelpers.addToCart(req.params.id,req.session.user._id).then((response)=>{
    res.redirect('/')
  })
})
module.exports = router;
