var db = require('../config/connection')
var collection = require('../config/collection')
const bcrypt = require('bcrypt')
const { resolve, reject } = require('promise')


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
                bcrypt.compare(JSON.stringify(userData.Password), JSON.stringify(user.Password)).then((status)=>{
                    if(status){
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
    }

}