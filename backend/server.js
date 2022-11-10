const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});

const app = require('./app');


const DB  = process.env.DATABASE;

//const port = process.env.PORT || 3000;

//connecting to mongodb database

mongoose.connect(DB, {
    useNewUrlParser:true
})
.then(()=>
{console.log('DB connection successful!')
})
.catch((err)=>
{console.log(err)});


 