const { User_model } = require('../Model/userModel');

const jwt = require('jsonwebtoken');
const SecKey = require('../config/config')

const randomString = require('randomstring')
const fs = require('fs');


let nodemailer = require('nodemailer')
const mail = (email, name, rendom) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        requireTLS: true,
        auth: {
            user: 'rahul658541@gmail.com',
            pass: 'nvyvhbhhvqzvdonj' // Use the App Password you generated
        }
    });



    const mailOptions = {
        from: 'rahul658541@gmail.com',
        to: email,
        subject: 'Reset Password',
        html: `
            <h1>${name}, Please Reset Password</h1>
            <p>Click here to <strong><a href="http://localhost:3000/reset-password?token=${rendom}">Reset Password</a></strong></p>
            <button>Save</button>
            <button>Cancel</button>
            <p>Your Verification Code is : ${rendom}</p>
          
        `
    };


    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            throw err
            // return res.status(500).send(err.message);
        }
        console.log(info.response);

    });
};




const JWT = async (id) => {
    let token = await jwt.sign({ _id: id }, SecKey.secrateKey)
    return token
}
const bcrypt = require('bcrypt');
const config = require('../config/config');

const hash = (password) => {
    let secure = bcrypt.hash(password, 15)
    return secure
}



const register = async (req, res) => {
    try {
        // Assuming you are expecting other data in the request body
        // const { name, email, mobile, password, type } = req.body;

        // Assuming 'image' is the field name in the form for file upload
        const hasing = await hash(req.body.password)
        const user_data = new User_model({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: hasing,
            type: req.body.type,
            image: req.file.filename
        });

        // Save the user_data to the database
        const savedUser = await user_data.save();
        console.log(savedUser)

        res.status(201).json({
            message: 'User registered successfully',
            user: savedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
};

// use Login    
const Login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        let obj = { mail: email, pas: password }
        console.log(obj)

        let find_mail = await User_model.findOne({ email: email });

        if (find_mail) {
            const isPasswordValid = await bcrypt.compare(password, find_mail.password);
            const Token = await JWT(find_mail._id)
            if (isPasswordValid) {
                const login_data = {
                    _id: find_mail._id,
                    name: find_mail.name,
                    email: find_mail.email,
                    mobile: find_mail.mobile,
                    type: find_mail.type,
                    image: find_mail.image,
                    Authorization: Token
                };
                console.log(login_data.Authorization)

                res.status(200).send({ message: true, Authentication: "Successful", login_data });
            } else {
                res.status(200).send({ message: false, Authentication: "Failed" });
            }
        } else {
            res.status(200).send({ message: false, Authentication: "Failed" });
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(400).send('Something went wrong during login');
    }
};



// for user_update password
const updatePassword = async (req, res) => {
    try {
        const id = req.body.id;
        const password = req.body.password;
        const data = await User_model.findOne({ _id: id });

        if (data) {
            const pass = hash(password);
            await data.updateOne({ _id: id }, { $set: { password: pass } });
            res.status(200).send("Password updated successfully");
        } else {
            res.status(400).send("User not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
};


const forgetPassword = async (req, res) => {
    try {
        const email = req.body.email;
        const data = await User_model.find({ email: email });
        console.log(data[0].email)

        if (data) {
            const rendom = randomString.generate();
            await User_model.updateOne({ email: data[0].email }, { $set: { rendom: rendom } });
            await mail(data[0].email, data[0].name, rendom);
            res.status(200).send({ message: 'Mail has been sent to user' });



        } else {
            res.status(404).send({ message: 'Password reset failed - User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Password reset failed - Internal Server Error' });
    }
};





// user Reset password
const resetPassword = async (req, res) => {
    try {
        const token = req.query.token;
        const password = req.body.password;
        console.log(token);

        // Use await for User_model.findOne
        const validToken = await User_model.findOne({ rendom: token });

        // Check for validToken existence
        if (validToken) {
            // Assuming hash is an asynchronou/s function, handle errors
            try {
                const hashedPassword = await bcrypt.hash(password, 10);

                console.log(hashedPassword)
                // Use await for User_model.updateOne
                await User_model.updateOne({ _id: validToken._id }, { $set: { password: hashedPassword, rendom: '' } }, { new: true });
                res.status(200).send({ success: true, msg: "Password has been updated successfully" });
            } catch (err) {
                console.log(err);
                res.status(500).send("Error hashing the password"); b
            }
        } else {
            res.status(400).send({ message: "Token not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
};



//  Refresh-Token
const renew_token = async (id) => {
    try {
        const secrateKey = config.secrateKey;
        const newkey = randomString.generate(secrateKey)

        const read = fs.readFile('config/config.js', 'utf-8', (err, data) => {
            if (err) {
                console.log(err)
            } else {
                fs.writeFile('config/config.js', data.replace(new RegExp(secrateKey), newkey), (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("key updated")
                    }
                })
            }
        })

        const token = jwt.sign({ _id: id }, newkey)
        return token


    } catch (error) {

        res.status(500).send("An error occurred");

    }
}

const RefreshToken = async (req, res) => {
    try {

        const user_id = req.body.user_id;
        const userData = await User_model.findById({ _id: user_id });
        if (userData) {
            const token = renew_token(userData)
            res.status(200).send({ message: true, token: token.token });

        } else
            res.status(400).send({ message: "User not found" });
    } catch (error) {
        if (error)
            res.status(500).send("An error occurred");

    }
}
module.exports = {
    register,
    Login,
    updatePassword,
    forgetPassword,
    resetPassword,
    RefreshToken,
};
