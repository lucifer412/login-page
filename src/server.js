
// requiring or importing modules.....
const express = require('express')
const path = require('path')
const app = express()
require('./db/dbconnect')

const collection = require('./models/schema');

//setting up the server to serve the static page
const static_path = path.join(__dirname, "../public")
//this /form sets the url to  'http://localhost:3000/form/'
app.use('/form', express.static(static_path))
app.use(express.urlencoded({ extended: false }))


const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log(`the server has started running on port ${port}`);
})
app.get('/', (req, res) => {
    res.send(`go to link http://localhost:3000/form/`)
})
app.get('/form')

app.post('/sign-in', async (req, res) => {
    try {
        //for next day: 
        // add name parameter to all the html tags 
        // create a record in the database

        const { usrname, email, password, confpassword } = req.body;
        // console.log(`username : ${usrname} \n email : ${email} \n password : ${password} \n confirm password : ${confpassword}`);
        //validations will be done in the server.......
        if (password === confpassword) {

            const info = new collection({
                usrname: usrname,
                email: email,
                password: password
            })
            const collections = await info.save()
            // console.log(collections);
        }else{
            res.send('passwords are not matching!!!!!!')
        }

        res.redirect('/form')
    }
    catch (err) {
        console.log(`data submitting error \n ${err}`)
    }
})

app.post('/login', async (req, res) => {
    try {

        const { usrname, password } = req.body;

        const checkmail = await collection.findOne({ usrname : usrname })
        if(checkmail.password=== password){
            res.send('you are logged in !!!!!!')
        }else{
            res.send('given credentials are invalid!!!!')
        }
    }
    catch(err){
        console.log(`login page error \n${err}`);
    }
    
})

