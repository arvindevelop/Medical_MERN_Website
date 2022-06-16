const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/*--------------------------------------------------under development---------------------------------------------------------------*/

const passport = require('passport');
const CLIENT_URL = "http://localhost:5000/";  //make it 3000 for client, right now it is ok, only for server

/*--------------------------------------------------under development end-------------------------------------------------------------*/

const User = require('../model/userSchema');
dotenv.config({path:'../config.env'});


const auth = async (req,res,next) => {

    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY); //verification of valid token
        //const verifyUser = jwt.verify(token, "secretkey");

        const user = await User.findOne({_id:verifyUser._id});
        //console.log(user);
        next();
    } 
    catch (error) {
        console.log("error: " + error);
        res.status(401).send("Please register/Login: " + error);
    }
}

//First it authorize the user then land on this page
router.get('/secretpage', auth, (req,res) => {
    res.send(`secret`);
})

router.get('/v1/api/login',async (req,res) => {
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(422).json({status:422, error:"Please fill the data properly."});
        }

        const userLogin = await User.findOne({email:email});

        if(userLogin){

            const isMatch = await bcrypt.compare(password,userLogin.password);

            if(!isMatch){
                res.status(401).json({status:401, error:"invalid credential"});
            }
            
            else{

                //token generation
                const token = await userLogin.generateAuthToken();
                res.cookie("jwt",token);
                //console.log(req.cookies.jwt);
                
                const updateLastLoggedData = await User.findByIdAndUpdate(userLogin._id,{'$set' : { 'lastLogged' : Date.now()} }, { new : true });
                res.status(200).json({status:200, message:"signin successfully", userData:updateLastLoggedData});
            }
        }else{
            res.status(401).json({status:401, error:"invalid credential"});
        }
        
    }catch(err){
        console.log(err);
    }
})

router.post('/v1/api/register', async (req,res) =>{

    const {username,email,password,role} = req.body;

    if(!username || !email || !password || !role){
        return res.status(422).json({status:422, error: "plz fill the field properly"});
    }

    try{
       const userExist = await User.findOne({email:email});

       if(userExist){
            return res.status(400).json({status:400, error: "Email already exist"});
        }
        
        else{
            const user = new User({username,email,password,role});
            
            //token generation
            const token = await user.generateAuthToken();
            res.cookie("jwt",token);
            
            await user.save();
            res.status(200).json({status:200, message:"user registered successfully"});
        }
    }
    catch(err){
        console.log(err);
    }
})


/*-----------------------------------------------------------------under development-------------------------------------------------------*/

// router.get("/login/success", (req, res) => {
//     console.log('Success');
//     if (req.user) {
//       res.status(200).json({
//         success: true,
//         message: "successfull",
//         user: req.user,
//         //   cookies: req.cookies
//       });
//     }
//     else
//         res.send("Did'n get user");
//   });

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