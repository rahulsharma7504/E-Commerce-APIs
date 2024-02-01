const express = require('express');
const app = express();

const multer = require('multer');
const path = require('path');

const Auth=require('../middleware/Auth')
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
app.get('/login',userController.Login);
app.post('/login',userController.Login);
app.get('/login/auth',Auth,(req,res)=>{
    // res.status(200).send({msg:"token verified"})

})

// For user Update password

app.post('/update_password', userController.updatePassword);


//User Forget-Password

app.post('/forget_password', userController.forgetPassword);
//User Reset_Password
app.get('/reset-password', userController.resetPassword);

app.post('/refresh-token',Auth, userController.RefreshToken);
module.exports = app;
