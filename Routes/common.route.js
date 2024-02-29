const express=require('express');

const app=express();

const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Auth=require('../middleware/Auth')
const commonController=require('../Controller/common_controller');

app.post('/find_data',Auth,commonController.Count_data)

module.exports = app