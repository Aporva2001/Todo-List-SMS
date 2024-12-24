const express = require('express');
const todoRoutes= require('./routes/todos');
const userRoutes= require('./routes/user')
const bodyParser= require('body-parser');
const mongoose= require('mongoose');
const dueCheck = require('./controllers/dueCheck');
require('dotenv').config();

const app= express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization')
    next();
})
app.use(dueCheck);
app.use(todoRoutes);
app.use(userRoutes);


mongoose.connect(`${process.env.MONGODB_URI}`).then(()=>{
    app.listen(process.env.PORT || 8080);
    console.log('Database connected Successfully')
})
.catch(err =>{
    console.log('Database connection failed')
})