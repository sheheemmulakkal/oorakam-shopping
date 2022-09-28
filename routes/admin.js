var express = require('express');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers')

/* GET home page. */
router.get('/', function(req, res, next) {

  
  res.render('admin/admin-home',{admin:true});
});

router.get('/add-products',(req,res)=>{
  res.render('admin/add-products',{admin:true})
})

router.post('/add-products',(req,res)=>{
  productHelpers.addProducts(req.body).then((id)=>{
    let image=req.files.Image
    image.mv('./public/images/product-images/'+id+'.jpg').then((err)=>{
      if(!err){
        console.log('hiiiii');
        res.render('admin/add-products')
      }else{
        console.log(err)
      }
    })
  })
})
router.get('/add-goldrate',(req,res)=>{
  res.render('admin/add-goldRate',{admin:true})
})

router.post('/add-goldRate',(req,res)=>{
 
  productHelpers.goldRate(req.body).then(()=>{
  
    res.render('admin/add-goldRate')
  })
})


module.exports = router;
