const mongo=require('mongoose')

mongo.connect('mongodb://127.0.0.1:27017/loginpage',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Database connection successfull');
}).catch((err)=>{
    console.log(`Databse entry denied \n ${err}`)
});

