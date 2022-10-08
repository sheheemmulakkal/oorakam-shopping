const { resolve, reject } = require('promise')
var db = require('../config/connection')
var collection = require('../config/collection')
var objectId = require("mongodb").ObjectId
const { response } = require('../app')

module.exports={
    addProducts:(productDetails)=>{
    
           
        return new Promise(async(resolve,reject)=>{
           await db.get().collection(collection.PRODUCT_COLLECTIONS).insertOne(productDetails).then((data)=>{
               
                resolve(data.insertedId)
            })
            
        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
           await db.get().collection(collection.PRODUCT_COLLECTIONS).find().toArray().then((products)=>{
                resolve(products)
            })
        })
    },
    goldRate:(goldRate)=>{
        let goldRateDate={ dateAdded: new Date(), goldRate }
        return new Promise(async(resolve,reject)=>{
           await db.get().collection(collection.GOLDRATE_COLLECTIONS).insertOne(goldRateDate).then(()=>{
           
                resolve()
            })
        })
    },
    getGoldRate:(value)=>{
        return new Promise(async(resolve,reject)=>{
            
            let rate = await db.get().collection(collection.GOLDRATE_COLLECTIONS).aggregate([
                {$sort:{ 'dateAdded':-1 }
            },
            {
                $project:{"goldRate.Goldrate":1}
            },
            {
                $limit:1
            },
            {
                $group:{_id:'$goldRate.Goldrate'}
            }]).toArray()
            
            console.log(rate);
            resolve(rate[0])
            })
       
    },
    getProductDetails:(prodId)=>{
        return new Promise(async(resolve,reject)=>{
          await db.get().collection(collection.PRODUCT_COLLECTIONS).findOne({_id:objectId(prodId)}).then((response)=>{
            resolve(response)
          })
        })

    },
    updateProduct:(prodId,productDetails)=>{
            console.log("2222");
        return new Promise(async(resolve,reject)=>{
            console.log("3333");
           await db.get().collection(collection.PRODUCT_COLLECTIONS).updateOne({_id:objectId(prodId)},{
                $set:{
                    Name:productDetails.Name,
                    Catogery:productDetails.Catogery,
                    MC:productDetails.MC,
                    Price:productDetails.Price,
                    Weight:productDetails.Weight
                }
            }).then((response)=>{
                console.log("4444"+response);
                resolve()            })
        })
    },
    deleteProduct:(prodId)=>{
      return new Promise((resolve,reject)=>{
        db.get().collection(collection.PRODUCT_COLLECTIONS).deleteOne({_id:objectId(prodId)}).then((response)=>{
            resolve(response)
        })
      })
    }
}