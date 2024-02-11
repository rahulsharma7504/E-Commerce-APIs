const express = require('express');
const product_route = express();
const multer = require('multer');
const path = require('path');
const Auth = require('../middleware/Auth');
const bodyParser = require('body-parser');

// Uncomment the line below if your application requires JSON body parsing
// product_route.use(bodyParser.json());

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../store_images/product_images'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage,limits:{files:3} });

// Import the products controller
const productController = require('../Controller/products_controller');

// Define the product route, including authentication middleware and file upload middleware
// Consider the order of middleware execution based on your requirements
product_route.post('/product', Auth, upload.array('image'), productController.productController);

module.exports = product_route;
