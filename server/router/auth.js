const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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


module.exports = router;