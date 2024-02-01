const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const Auth = require('../middleware/Auth');
const sub_categoryController = require('../Controller/sub_categoryController');

app.use(bodyparser.json());

app.post('/sub-category_data', Auth, sub_categoryController.Sub_categories);

module.exports= app