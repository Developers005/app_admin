const express=require('express');
const bcrypt=require('bcrypt');
const cors=require('cors')
const mongoose=require('mongoose');

const adminrouter=require('./routus/admin')

const Joi = require('joi');
require('dotenv').config()
const port=process.env.PORT||2001;
const app=express();
const adminModel=require('./schemas/admin')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())


mongoose.connect(process.env.URI)
.then(()=>{
    console.log("database is connected successfully 😀😃😄");
})
.catch(err=>{
    console.log("database is not connected 😔😔☹️");
})


app.use('/admin',adminrouter)





app.listen(port,()=>{
    console.log(` port http://localhost:${port} is running `);
})



