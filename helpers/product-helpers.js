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
        return new Promise(async(resolve,reject)=>{
           await db.get().collection(collection.GOLDRATE_COLLECTIONS).insertOne(goldRate).then(()=>{
                resolve()
            })
        })
    },
    getGoldRate:()=>{
        return new Promise(async(resolve,reject)=>{
            
            db.get().collection(collection.GOLDRATE_COLLECTIONS).find().sort({ Goldrate: -1 }).toArray()
            .then((data)=>{
                console.log(data);
                resolve(data[0])
            })
            })
       
    },
    getProductDetails:(prodId)=>{
        return new Promise(async(resolve,reject)=>{
          await db.get().collection(collection.PRODUCT_COLLECTIONS).findOne({_id:objectId(prodId)}).then((response)=>{
            resolve(response)
          })
        })

    }
}