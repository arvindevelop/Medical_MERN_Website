const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Profile = require('../models/profileSchema');
dotenv.config({path:'../config/details.env'});
const verify = require('../middleware/verify');


router.post('/api/v1/profile/', verify, async (req,res) =>{

    const {_id, email} = req.body;

    if(!_id || !email){
        return res.status(400).json({status:400, error: "Client error"});
    }

    try{
       const profileExist = await Profile.findOne({_id,_id});

       if(profileExist){
            return res.status(406).json({status:406, message: "profile exist"});
        }
        else{
            const profile = new Profile(req.body);
            const savedProfile = await profile.save();
            res.status(201).json({status:201, message:"success"});
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
        res.status(200).json({status:200, message:"success", allprofile:allProfile});
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }    
})

router.get('/api/v1/profile/:id', verify, async (req,res) =>{

    const _id = req.params.id;
    try {
        const profile = await Profile.findOne({_id:_id});
        if(!profile){
            res.status(406).json({status:406, message:"Does not exist"});
        }
        else{
            res.status(200).json({status:200, message:"success", profile:profile});
        }
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }    
})

router.delete('/api/v1/profile/:id', verify, async (req,res) =>{

    const _id = req.params.id;
    try{
        const profileExist = await Profile.findOne({_id:_id});
        if(!profileExist){
             return res.status(406).json({status:406, error: "Does not exist"});
         }
         else{
             await Profile.deleteOne({_id:_id});
             res.status(201).json({status:201, message:"success"});
         }
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
})

router.patch('/api/v1/profile/:id', verify, async (req,res) =>{

    const _id = req.params.id;

    try{
        const profileExist = await Profile.findOne({_id:_id});
        if(!profileExist){
             return res.status(406).json({status:406, error: "Does not exist"});
         }
         else{
            await Profile.updateOne({_id:_id},{$set : req.body});
            res.status(200).json({status:200, message:"success"});
         }
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
})

module.exports = router;