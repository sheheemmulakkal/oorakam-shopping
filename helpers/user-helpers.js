var db = require('../config/connection')
var collection = require('../config/collection')
const bcrypt = require('bcrypt')
const { resolve, reject } = require('promise')
const { ObjectId } = require('mongodb')
const { response } = require('../app')
const { promise } = require('bcrypt/promises')
const async = require('hbs/lib/async')


module.exports = {

    doSignup: (userData) => {

        return new Promise(async (resolve, reject) => {
            userData.Password = await bcrypt.hash(userData.Password, 10)
            db.get().collection(collection.USER_COLLECTIONS).insertOne(userData).then((data)=>{
                console.log(data);
                resolve(data)
            })
            
        })

    },
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let response={}

            let user = await db.get().collection(collection.USER_COLLECTIONS).findOne({Email:userData.Email})
            if(user){
                bcrypt.compare(userData.Password,user.Password).then((status)=>{
                    if(status){

                        console.log("login success");
                    response.user=user
                    response.status=true
                    resolve(response)
                    
                    }else{
                        console.log('incorrect password');
                        resolve({status:false})
                    }
                    
                })

            } else {
                console.log('incorrect email');
                resolve({status:false})
            }
        })
    },
    addToCart:(proId,userId)=>{
        return new Promise(async(resolve,reject)=>{
            let userCart=await db.get().collection(collection.CART_COLLECTIONS).findOne({user:ObjectId(userId)})
            if(userCart){
                await db.get().collection(collection.CART_COLLECTIONS).updateOne({user:ObjectId(userId)},{
                   
                        $push:{product:ObjectId(proId)}
                    
                }).then((response)=>{
                    resolve()
                })
            }else{
                let cartObj={
                    user:ObjectId(userId),
                    product:[ObjectId(proId)]
                }
                await db.get().collection(collection.CART_COLLECTIONS).insertOne(cartObj).then((response)=>{
                    resolve()
                })
            }
        })
    },
    

}