const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate')

require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req,res) => {
    res.send("Hello from router js");
});

router.post('/register', async (req,res) => {
    const {name,email,phone,work,password,cpassword} = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({error: "Fill all the fields"});
    }

    try {
        const userExist = await User.findOne({email:email});
        if(userExist){
            return res.status(422).json({error: "Email already exists"});
        } else if(password!=cpassword){
            return res.status(422).json({error: "Password and Confirm password don't match"});
        }else{
        const user = new User({name,email,phone,work,password,cpassword});
        await user.save();
        res.status(201).json({message: "User registered successfully"});
        }
    }catch(err){
        console.log(err);
    }


});

router.post('/signin', async (req,res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password) {
            res.status(400).json({error: "Fill the fields"});
        }

        const userLogin = await User.findOne({email:email});
        // console.log(userLogin);

        if(userLogin){
            const isMatch = await bcrypt.compare(password,userLogin.password);

            const token = await userLogin.generateAuthToken();

            res.cookie('jwtoken',token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if(!isMatch) {
                res.status(400).json({error: "Email and password don't match"});
            }else{
                res.status(201).json({message: "Signin successful"});
            }
        }else{
            res.status(400).json({error: "Email and password don't match"});
        }
        
        
    }catch(err) {
        console.log(err);
    }
})

router.get('/about',authenticate,(req,res) =>{

    res.send(req.rootUser);
});

// For contact and home page
router.get('/getdata', authenticate, (req,res) => {
    res.send(req.rootUser);
})

router.post('/contact', authenticate , async (req,res) => {
    try {
        const {name,email,phone,message} = req.body;

        if(!name || !email || !phone || !message){
            console.log("Error in form");
            return res.send({error: "Fill all the fields"});
        }

        const userContact = await User.findOne({_id: req.userID})

        if(userContact) {
            const userMessage = await userContact.addMessage(name,email,phone,message);

            await userContact.save();
            res.status(201).json({message:"Message sent"});
        }

    }catch(err){
        console.log(err);
    }
});

router.get('/logout', (req,res) => {
    res.clearCookie('jwtoken', {path:'/'});
    res.status(200).send('User logout');
})

module.exports = router;