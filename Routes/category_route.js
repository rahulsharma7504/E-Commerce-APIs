const express=require('express');

const app=express();

const bodyparser=require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true }));

const Auth=require('../middleware/Auth')

const categoryController=require('../Controller/categoryController');
app.post('/category-data',Auth,categoryController.categoryData)


module.exports=app;