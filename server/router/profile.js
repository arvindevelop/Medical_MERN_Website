const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Profile = require('../model/profileSchema');
dotenv.config({path:'../config.env'});
const verify = require('../middleware/verify');


router.post('/api/v1/profile/', verify, async (req,res) =>{

    const {_id, email, name, age, gender, weight} = req.body;

    if(!_id || !email || !name || !age || !gender || !weight){
        return res.status(406).json({status:406, error: "invalid details"});
    }

    try{
       const profileExist = await Profile.findOne({name:name});

       if(profileExist){
            return res.status(406).json({status:406, message: "profile exist"});
        }
        else{
            const profile = new Profile(req.body);
            const savedProfile = await profile.save();
            res.status(201).json({status:201, message:"success", profileData:savedProfile});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }
})

router.get('/api/v1/profile/', verify, async (req,res) =>{

    try {
        const allProfile = await Profile.find({});
        res.status(201).json({status:201, message:"success", allprofile:allProfile});
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }    
})

router.get('/api/v1/profile/:name', verify, async (req,res) =>{

    const profileName = req.params.name;
    try {
        const profile = await Profile.findOne({name:profileName});
        if(!profile){
            res.status(406).json({status:406, message:"Invalid details"});
        }
        else{
            res.status(201).json({status:201, message:"success", profile:profile});
        }
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }    
})

router.delete('/api/v1/profile/:name', verify, async (req,res) =>{

    const profileName = req.params.name;
    try{
        const profileExist = await Profile.findOne({name:profileName});
        if(!profileExist){
             return res.status(406).json({status:406, error: "invalid detail"});
         }
         else{
             await Profile.deleteOne({name:profileName});
             res.status(201).json({status:201, message:"success"});
         }
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
})

router.put('/api/v1/profile/:name', verify, async (req,res) =>{

    const profileName = req.params.name;
    const {_id, email, name, age, gender, weight} = req.body;

    if(!_id || !email || !name || !age || !gender || !weight){
        return res.status(406).json({status:406, error: "invalid details"});
    }

    try{
        const profileExist = await Profile.findOne({name:profileName});
        if(!profileExist){
             return res.status(406).json({status:406, error: "invalid detail"});
         }
         else{
            await Profile.updateOne({name:profileName},{$set : req.body});
            res.status(201).json({status:201, message:"success"});
         }
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
})

router.get('/api/v1/profile/shared', verify, (req,res) => {
    
})


module.exports = router;