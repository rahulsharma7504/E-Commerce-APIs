const express = require('express');
const app = express();

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../images/user_image')); // Specify the destination folder, for example, 'uploads'
    },
    filename: (req, file, cb) => {
        // You can customize the filename if needed, for example:
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const userController = require('../Controller/user_controller');

// Use multer middleware for handling file uploads if needed
app.post('/register', upload.single('image'), userController.register);
app.post('/login',userController.Login);

module.exports = app;
