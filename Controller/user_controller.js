const { User_model } = require('../Model/userModel');

const jwt=require('jsonwebtoken');

let key="fnksdfnksnfns"
const JWT=async(id)=>{
    let token=await jwt.sign({_id:id},key)
    return token
}
const bcrypt=require('bcrypt');

const hash=(password)=>{
    let secure=bcrypt.hash(password,15)
    return secure
}



const register = async (req, res) => {
    try {
        // Assuming you are expecting other data in the request body
        // const { name, email, mobile, password, type } = req.body;

        // Assuming 'image' is the field name in the form for file upload
        const hasing= await hash(req.body.password)
        const user_data = new User_model({
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mobile,
            password:hasing,
            type:req.body.type,
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
        let obj={mail:email,pas:password}
        console.log(obj)

        let find_mail = await User_model.findOne({ email: email });

        if (find_mail) {
            const isPasswordValid = await bcrypt.compare(password, find_mail.password);
             const Token= await JWT(find_mail._id)
            if (isPasswordValid) {
                const login_data = {
                    _id: find_mail._id,
                    name: find_mail.name,
                    email: find_mail.email,
                    mobile: find_mail.mobile,
                    type: find_mail.type,
                    image: find_mail.image,
                    token:Token
                };
                console.log(login_data.token)

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





module.exports = {
    register,
    Login
};
