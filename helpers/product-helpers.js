const { resolve, reject } = require('promise')
var db = require('../config/connection')
var collection = require('../config/collection')
const { response } = require('../app')

module.exports={
    addProducts:(productDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTIONS).insertOne(productDetails).then((data)=>{
                console.log(data.insertedId);
                resolve(data.insertedId)
            })
            
        })
    },
    getAllProducts:()=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTIONS).find().toArray().then((products)=>{
                console.log(products);
                resolve(products)
            })
        })
    }
}