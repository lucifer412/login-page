const mongo=require('mongoose');



//the validations will be done in the database
const schema= new mongo.Schema({
    usrname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})


//creating a collection / table inside which the document/record resides
const collection = new mongo.model('Info',schema);

console.log(collection);

module.exports=collection;