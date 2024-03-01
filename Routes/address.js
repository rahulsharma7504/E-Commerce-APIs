const express=require('express');

const app=express();
const bodyparser=require('body-parser');

app.use(bodyparser.json())

const Auth=require('../middleware/Auth')

const AddressController=require('../Controller/AddressController')

app.post('/address',Auth, AddressController.AddAddress)


module.exports=app;