const express=require('express');

const app=express();
const bodyparser=require('body-parser');

app.use(bodyparser.json())

const Auth=require('../middleware/Auth')

const cartController=require('../Controller/CartController')

app.post('/add-to-cart',Auth, cartController.AddCart)


module.exports=app;