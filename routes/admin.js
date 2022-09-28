var express = require('express');
const { response } = require('../app');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers')

/* GET home page. */
router.get('/', async function(req, res, next) {
 let products= await productHelpers.getAllProducts()
  
  res.render('admin/admin-home',{admin:true,products});
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


router.get('/edit-product/:id',async(req,res)=>{
  let prodId= req.params.id
  let products =await productHelpers.getProductDetails(prodId)
  res.render('admin/edit-product',{products})
})

router.post('/edit-product/:id',(req,res)=>{
  
  console.log("1111");
productHelpers.updateProduct(req.params.id,req.body).then(()=>{
  res.redirect('/admin')
  if(req?.files?.Image){
    let image=req.files.Image
    image.mv('./public/images/product-images/'+req.params.id+'.jpg')
  }
})
})

router.get('/delete-product/:id',(req,res)=>{
  
  productHelpers.deleteProduct(req.params.id).then((response)=>{
    res.redirect('/admin')
  })
})



module.exports = router;
