const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Linked = require('../models/linkedSchema');
const Profile = require('../models/profileSchema');
dotenv.config({path:'../config/details.env'});
const verify = require('../middleware/verify');


router.post('/api/v1/linked/', verify, async (req,res) =>{

    const {main_email,linked_email,linked_name,profileName} = req.body;
    
    if(!main_email || !linked_email || !linked_name || !profileName){
        return res.status(406).json({status:406, message:'Invalid details'});
    }

    try {
        const linked = new Linked(req.body);
        const linkedData = await linked.save();
        res.status(201).json({staus:201, message:"success", linkedData:linkedData});
    } catch (err) {
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }
})

router.get('/api/v1/linked/', verify, async (req,res) =>{

    try{

        const allprofile = await Linked.find({});
        res.status(201).json({staus:201, message:"success", allprofile:allprofile});
    }catch(err) {
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }
})


router.get('/api/v1/linked/:name', verify, async (req,res) =>{

    const Name = req.params.name;
    try{
        const profile = await Linked.findOne({profileName:Name});
        res.status(201).json({staus:201, message:"success", profile:profile});
    }catch(err) {
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }
})

router.delete('/api/v1/linked/:name', verify, async (req,res) =>{

    const Name = req.params.name;
    try{
        const profile = await Linked.findOne({profileName:Name});
        if(!profile){
            return res.status(406).json({status:406, message: 'Invalid details'})
        }
        else{
            await Linked.deleteOne({profileName:Name});
            res.status(201).json({staus:201, message:"success"});
        }
    }catch(err) {
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }
})

router.put('/api/v1/linked/:name', verify, async (req,res) =>{

    const Name = req.params.name;
    const {_id, email, name, age, gender, weight} = req.body;

    if(!_id || !email || !name || !age || !gender || !weight){
        return res.status(406).json({status:406, error: "invalid details"});
    }

    try{
        const profile = Profile.findOne({name:Name});
        if(!profile){
            return res.status(406).json({status:406, message:'Invalid details'});
        }
        else{
            await Profile.updateOne({name:profileName},{$set : req.body});
            res.status(201).json({staus:201, message:"success"});
        }
    }catch(err) {
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }
})

module.exports = router;