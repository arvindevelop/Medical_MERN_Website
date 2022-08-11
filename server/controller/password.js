"use strict";
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/userSchema');
dotenv.config({path:'../config/details.env'});

const JWT_SECRET = process.env.SECRET_KEY;
var user;

// async function findUser(email)
// {
//     const userExist = await User.findOne({email:email});
//     user = userExist;
//     return userExist;
// }


router.post('/forgotPassword',async (req,res,next) => {
    const {email} = req.body;
    console.log(email)
    //make sure user exist in db
    const userExist = await User.findOne({email:email});
    console.log(userExist);
    if(!userExist)
    {
        res.send('User not registered');
        return;
    }

    //user exist and now create a one time link that is avalid for 15 min
    const secret = JWT_SECRET + userExist.password;
    const payload = {
        email : userExist.email,
        _id: userExist._id
    }
    const token = jwt.sign(payload,secret,{expiresIn:'15m'})
    const link = `http://localhost:5000/resetPassword/${userExist._id}/${token}`
    //console.log(link)

    //sent email
    try{
    // let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
     auth: {
    //    user: process.env.EMAIL_USERNAME,
    //    pass: process.env.EMAIL_PASSWORD
    user: 'example@gmail.com',
    pass: '************'
     }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'example@gmail.com', // sender address
      to: "example1@gmail.com", // list of receivers
      subject: "Password reset link", // Subject line
      text: link, // plain text body
    });

    res.send('password reset link has been sent to ur email...')
    }catch(error)
    {
        console.log(error.message);
    }
});

router.get('/resetPassword/:id/:token',async (req,res,next) => {
    const {id,token} = req.params
    //check if this id exist in database
    if(id !== user._id)
    {
        res.send('Invalid Id...')
        return;
    }

    //we have a valid id, and we have a valid user with this id
    const secret = JWT_SECRET + user.password;
    try{
        const payload = jwt.verify(token,secret);
        res.render('resetPassword',{email:user.email});
    }
    catch(error)
    {
        console.log(error.message);
        res.send(error.message);
    }
});

router.post('/resetPassword/:id/:token',async (req,res,next) => {
    const {id,token} = req.params;
    const {password,password2} = req.body;
    if(id !== user._id)
    {
        res.send('Invalid Id...')
        return;
    }

    if(password !== password2)
    {
        res.send('password mismatch...')
        return;
    }

    const secret = JWT_SECRET + user.password;
    try {
        const payload = jwt.verify(token,secret);
        //validate password and password2 match
        //always hash the password before saving
        const password = bcrypt.hashSync(password, 12);
        await User.updateOne({_id:user._id},{$set : {'password':password}});
        user.password = password;
        res.send(user)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
});

module.exports = router;