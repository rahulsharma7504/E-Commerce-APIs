const express=require('express');
const app=express();


const userController=require('../Controller/user_controller')

app.post('/register',userController.register)

module.exports=app