const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const VtrackReading = require('../model/vtrackReadings');
dotenv.config({path:'../config.env'});
const verify = require('../middleware/verify');


router.post('/api/v1/vtrack/', verify, async (req,res) =>{

    const {_id, email, name, deviceName, deviceId, temperature, timeStamp, date} = req.body;
    if(!_id || !email || !name || !deviceName || !deviceId || !temperature || !timeStamp || !date){
        return res.status(406).json({status:406, error: "invalid details"});
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

router.get('/api/v1/vtrack/:name/:deviceId', verify, async (req,res) =>{

    const Name = req.params.name;
    const DeviceId = req.params.deviceId;
    try {
        const allReading = await VtrackReading.find({name:Name,deviceId:DeviceId});
        res.status(201).json({status:201, message:"success", allreading:allReading});
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }    
})

router.delete('/api/v1/vtrack/:name/:deviceId', verify, async (req,res) =>{

    const Name = req.params.name;
    const DeviceId = req.params.deviceId;
    try{
        const readingExist = await VtrackReading.findOne({name:Name,deviceId:DeviceId});
        if(!readingExist){
             return res.status(406).json({status:406, error: "invalid detail"});
         }
         else{
             await VtrackReading.deleteMany({name:Name,deviceId:DeviceId});
             res.status(201).json({status:201, message:"success"});
         }
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
})

router.delete('/api/v1/vtrack/:start/:end', verify, async (req,res) =>{

    const startDate = req.params.start;
    const endDate = req.params.end;
    try{
        await VtrackReading.deleteMany({});
        res.status(201).json({status:201, message:"success"});
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
})

module.exports = router;