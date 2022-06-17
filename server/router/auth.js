const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/*--------------------------------------------------under development OAuth---------------------------------------------------------------*/

const passport = require('passport');
const CLIENT_URL = "http://localhost:5000/";  //make it 3000 for client, right now it is ok, only for server

/*--------------------------------------------------under development end-------------------------------------------------------------*/

const User = require('../model/userSchema');
dotenv.config({path:'../config.env'});


const auth = async (req,res,next) => {

    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        //const verifyUser = jwt.verify(token, "secret key");
        //const user = await User.findOne({_id:verifyUser._id});
        next();
    } 
    catch (error) {
        console.log("error: " + error);
        res.status(401).send("Please register/Login: " + error);
    }
}

router.get('/api/v1/auth/login',async (req,res) => {

    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({error:"invalid details"});
        }

        const userLogin = await User.findOne({email:email});

        if(userLogin){

            const isMatch = await bcrypt.compare(password,userLogin.password);

            if(!isMatch){
                res.status(400).json({error:"invalid details"});
            }
            else{
                //token generation
                const token = await userLogin.generateAuthToken();
                res.cookie("jwt",token);
                
                await User.findByIdAndUpdate(userLogin._id,{'$set' : { 'lastLogged' : Date.now()} }, { new : true });
                res.status(200).json({status:"success", jwtToken:token});
            }
        }
        else{
            res.status(400).json({error:"invalid details"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"server error"});
    }
})

router.post('/api/v1/auth/register', async (req,res) =>{

    const {username,email,password,role} = req.body;

    if(!username || !email || !password || !role){
        return res.status(400).json({error: "invalid details"});
    }

    try{

       const userExist = await User.findOne({email:email});

       if(userExist){
            return res.status(400).json({error: "Email already exist"});
        }
        else{
            const user = new User({username,email,password,role});

            //token generation
            const token = await user.generateAuthToken();
            res.cookie("jwt",token);

            const savedUser = await user.save();
            res.status(200).json({status:"success", userData:savedUser});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"server error"});
    }
})

//First it authorize the user then do another operation
router.get('/api/v1/auth/all', auth, async (req,res) =>{

    try {
        const allUser = await User.find({});
        res.status(200).json({status:"success", allUser:allUser});
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({error:"server error"});
    }    
})

router.delete('/api/v1/auth/del/:email', auth, async (req,res) =>{

    const userEmail = req.params.email;
    try{
        const userExist = await User.findOne({email:userEmail});
 
        if(!userExist){
             return res.status(400).json({error: "invalid detail"});
         }
         else{
             await User.deleteOne({email:userEmail});
             res.status(200).json({message:"success"});
         }
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
})

router.patch('/api/v1/auth/update/:email', auth, async (req,res) =>{

    const userEmail = req.params.email;
    var {username, password} = req.body;
    try{
        const userExist = await User.findOne({email:userEmail});
        if(!userExist){
             return res.status(400).json({error: "invalid detail"});
         }
         else{
            password = bcrypt.hashSync(password, 12);
            await User.updateOne({email:userEmail},{$set : { 'username' : username, 'password' : password, 'lastLogged' : Date.now()}});
            res.status(200).json({message:"success"});
         }
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
})

/*-----------------------------------------------------------------under development-------------------------------------------------------*/

router.get("/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  });

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
  });
  
router.get("/auth/google", passport.authenticate("google", { scope: ["profile","email"] }));
  
router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: CLIENT_URL,
      failureRedirect: "/login/failed",
    })
);
  
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