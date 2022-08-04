const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/*--------------------------------------------------under development OAuth---------------------------------------------------------------*/

// const passport = require('passport');
// const CLIENT_URL = "http://localhost:3000/dashboard";  //make it 3000 for client, right now it is ok, only for server

/*--------------------------------------------------under development end-------------------------------------------------------------*/

const User = require('../models/userSchema');
dotenv.config({path:'../config/details.env'});
const verify = require('../middleware/verify');
const verifyRole = require('../middleware/verifyRole');


router.post('/api/v1/auth/login',async (req,res) => {
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({status:400, error:"client error"});
        }

        const userLogin = await User.findOne({email:email});
        if(userLogin){

            const isMatch = bcrypt.compare(password,userLogin.password);
           // console.log(isMatch)

            if(!isMatch){
                res.status(406).json({status:406, error:"Invalid email or password"});
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
            res.status(406).json({status:406, error:"Invalid email or password"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }
})

router.post('/api/v1/auth/register', async (req,res) =>{

    const {_id,email} = req.body;

    if(!_id || !email){
        return res.status(400).json({status:400, error: "client error"});
    }

    if(req.body.hasOwnProperty('password') && req.body.password.length < 8){
        return res.status(400).json({status:400, error: "Password must be at least 8 chracters"});
    }
    try{

       const userExist = await User.findOne({_id:_id});

       if(userExist){
            return res.status(406).json({status:406, error: "User exist"});
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

router.get('/api/v1/auth/', verifyRole, async (req,res) =>{

    try {
        const allUser = await User.find({});
        res.status(200).json({status:200, message:"success", allUser:allUser});
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }    
})

router.get('/api/v1/auth/:email', verifyRole, async (req,res) =>{

    const userEmail = req.params.email;
    if(!userEmail)
    {
        return res.status(400).json({status:400, error: "client error"});
    }
    try{
        const userExist = await User.findOne({email:userEmail});
 
        if(!userExist){
             return res.status(406).json({status:406, error: "Does not exist"});
         }
         else{
             res.status(200).json({status:200, message:"success", userData:userExist});
         }
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
})

router.delete('/api/v1/auth/:email', verifyRole, async (req,res) =>{

    const userEmail = req.params.email;
    try{
        const userExist = await User.findOne({email:userEmail});
 
        if(!userExist){
             return res.status(406).json({status:406, error: "Does not exist"});
         }
         else{
             await User.deleteOne({email:userEmail});
             res.status(200).json({status:200, message:"success"});
         }
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
})

router.patch('/api/v1/auth/', verify, async (req,res) =>{

    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const userExist = await User.findOne({_id:verifyUser._id});
    const userEmail = userExist.email;

    if(req.body.hasOwnProperty('password') && req.body.password.length < 8){
        return res.status(400).json({status:400, error: "Password must be at least 8 chracters"});
    }
    try{
        const userExist = await User.findOne({email:userEmail});
        if(!userExist){
             return res.status(406).json({status:406, error: "Does not exist"});
         }
         else{
            const password = bcrypt.hashSync(req.body.password, 12);
            await User.updateOne({email:userEmail},{$set : req.body});
            res.status(200).json({status:200, message:"success"});
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