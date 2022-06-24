const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Profile = require('../model/profileSchema');
dotenv.config({path:'../config.env'});
const verify = require('../middleware/verify');


router.post('/api/v1/profile/new', verify, async (req,res) =>{

    const {id, email, name, age, gender, weight} = req.body;

    if(!id || !email || !name || !age || !gender || !weight){
        return res.status(400).json({status:400, error: "invalid details"});
    }

    try{
       const profileExist = await Profile.findOne({email:email});

       if(profileExist){
            return res.status(400).json({status:400, message: "profile exist"});
        }
        else{
            const profile = new Profile({id, email, name, age, gender, weight});
            const savedProfile = await profile.save();
            res.status(200).json({status:200, message:"success", profileData:savedProfile});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }
})

router.get('/api/v1/profile/all', verify, async (req,res) =>{

    try {
        const allProfile = await Profile.find({});
        res.status(200).json({status:200, message:"success", allprofile:allProfile});
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }    
})

router.delete('/api/v1/profile/del/:name', verify, async (req,res) =>{

    const profileName = req.params.name;
    try{
        const profileExist = await Profile.findOne({name:profileName});
 
        if(!profileExist){
             return res.status(400).json({status:400, error: "invalid detail"});
         }
         else{
             await Profile.deleteOne({name:profileName});
             res.status(200).json({status:200, message:"success"});
         }
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
})

router.patch('/api/v1/profile/update/:name', verify, async (req,res) =>{

    const profileName = req.params.name;
    console.log(profileName);
    var {name, age, gender, weight} = req.body;
    try{
        const profileExist = await Profile.findOne({name:profileName});
        if(!profileExist){
             return res.status(400).json({status:400, error: "invalid detail"});
         }
         else{
            await Profile.updateOne({name:profileName},{$set : { 'name' : name, 'age' : age, 'gender' : gender, 'weight' : weight}});
            res.status(200).json({status:200, message:"success"});
         }
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
})

module.exports = router;