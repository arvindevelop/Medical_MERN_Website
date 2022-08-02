const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const VtrackReading = require('../models/vtrackReadings');
dotenv.config({path:'../config/details.env'});
const verify = require('../middleware/verify');


router.post('/api/v1/vtrack/', verify, async (req,res) =>{

    const {_id, email, profile_id, deviceID, temperature, time} = req.body;
    if(!_id || !email || !profile_id || !deviceID || !temperature || !time){
        return res.status(400).json({status:400, error: "Client error"});
    }

    try{
            const newReading = new VtrackReading(req.body);
            await newReading.save();
            res.status(201).json({status:201, message:"success"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }
})

router.get('/api/v1/vtrack/:profile_id/:deviceId', verify, async (req,res) =>{
    const profileId = req.params.profile_id;
    const deviceId = req.params.deviceId;
    try {
        const allReading = await VtrackReading.find({profile_id:profileId,deviceId:deviceId});
        res.status(201).json({status:201, message:"success", allreading:allReading});
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }    
})

module.exports = router;