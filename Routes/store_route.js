const express = require('express');
const store_route = express();
const bodyParser = require('body-parser');
store_route.use(bodyParser.json());
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'../store_images'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const Auth = require('../middleware/Auth');
const upload = multer({ storage: storage });

const store_controllers = require('../Controller/store_controllers');

// Ensure that Auth middleware returns a function that acts as a middleware
store_route.post('/store',Auth ,upload.single('logo'),store_controllers.Store);
store_route.post('/find-store',Auth ,store_controllers.Find_store);


module.exports = store_route;
