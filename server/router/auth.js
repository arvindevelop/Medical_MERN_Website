const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/*--------------------------------------------------under development OAuth---------------------------------------------------------------*/

// const passport = require('passport');
// const CLIENT_URL = "http://localhost:3000/dashboard";  //make it 3000 for client, right now it is ok, only for server

/*--------------------------------------------------under development end-------------------------------------------------------------*/

const User = require('../model/userSchema');
dotenv.config({path:'../config.env'});
const verify = require('../middleware/verify');


router.post('/api/v1/auth/login',async (req,res) => {
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(406).json({status:406, error:"invalid details"});
        }

        const userLogin = await User.findOne({email:email});
        if(userLogin){

            const isMatch = bcrypt.compare(password,userLogin.password);
           // console.log(isMatch)

            if(!isMatch){
                res.status(406).json({status:406, error:"invalid details"});
            }
            else{
                //token generation
                const token = await userLogin.generateAuthToken();
                res.cookie("jwt",token,{ 
                    expires: new Date(Date.now() + (3600 * 1000 * 24 * 365 * 1)),
                });

                await User.findByIdAndUpdate(userLogin._id,{'$set' : { 'lastLogged' : Date.now()} }, { new : true });
                res.status(201).json({status:201, jwtToken:token});
            }
        }
        else{
            res.status(406).json({status:406, error:"invalid details"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }
})

router.post('/api/v1/auth/register', async (req,res) =>{

    const {_id,userName,email} = req.body;

    if(!_id || !userName || !email){
        return res.status(406).json({status:406, error: "invalid details"});
    }

    if(req.body.hasOwnProperty('password') && password.length < 8){
        return res.status(406).json({status:406, error: "Password must be at least 8 chracters"});
    }
    try{

       const userExist = await User.findOne({email:email});

       if(userExist){
            return res.status(406).json({status:406, error: "Email already exist"});
        }
        else{
            const user = new User(req.body);

            //token generation
            const token = await user.generateAuthToken();
            res.cookie("jwt",token,{ 
                expires: new Date(Date.now() + (3600 * 1000 * 24 * 365 * 1)),
            });

            await user.save();
            res.status(201).json({staus:201, message:"success"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }
})

router.get('/api/v1/auth/', async (req,res) =>{

    try {
        const allUser = await User.find({});
        res.status(201).json({status:201, message:"success", allUser:allUser});
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }    
})

router.get('/api/v1/auth/:email', verify, async (req,res) =>{

    const userEmail = req.params.email;
    try{
        const userExist = await User.findOne({email:userEmail});
 
        if(!userExist){
             return res.status(406).json({status:406, error: "invalid detail"});
         }
         else{
             res.status(201).json({status:201, message:"success", userData:userExist});
         }
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
})

router.delete('/api/v1/auth/:email', verify, async (req,res) =>{

    const userEmail = req.params.email;
    try{
        const userExist = await User.findOne({email:userEmail});
 
        if(!userExist){
             return res.status(406).json({status:406, error: "invalid detail"});
         }
         else{
             await User.deleteOne({email:userEmail});
             res.status(201).json({status:201, message:"success"});
         }
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
})

router.delete('/api/v1/auth/', verify, async (req,res) =>{

    
    try{
        
        
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
})

router.put('/api/v1/auth/:email', verify, async (req,res) =>{

    const userEmail = req.params.email;
    if(req.body.hasOwnProperty('password') && password.length < 8){
        return res.status(406).json({status:406, error: "Password must be at least 8 chracters"});
    }
    try{
        const userExist = await User.findOne({email:userEmail});
        if(!userExist){
             return res.status(406).json({status:406, error: "invalid detail"});
         }
         else{
            password = bcrypt.hashSync(password, 12);
            await User.updateOne({email:userEmail},{$set : req.body});
            res.status(201).json({status:201, message:"success"});
         }
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
})

/*-----------------------------------------------------------------under development-------------------------------------------------------*/

// router.get("/login/failed", (req, res) => {
//     res.status(401).json({
//       success: false,
//       message: "failure",
//     });
//   });

// router.get("/logout", (req, res) => {
//     req.logout();
//     res.redirect(CLIENT_URL);
//   });
  
// router.get("/auth/google", passport.authenticate("google", { scope: ["profile","email"] }));
  
// router.get(
//     "/auth/google/callback",
//     passport.authenticate("google", {
//       successRedirect: CLIENT_URL,
//       failureRedirect: "/login/failed",
//     })
// );
  
//   router.get("/auth/facebook", passport.authenticate("facebook", { scope: ["profile","email"] }));
  
//   router.get(
//     "/auth/facebook/callback",
//     passport.authenticate("facebook", {
//       successRedirect: CLIENT_URL,
//       failureRedirect: "/login/failed",
//     })
//   );
  
/*------------------------------------------------------------under development end-------------------------------------------------------*/

module.exports = router;