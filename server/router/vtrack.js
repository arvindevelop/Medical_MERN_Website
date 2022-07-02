const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const VtrackReading = require('../model/vtrackReadings');
dotenv.config({path:'../config.env'});
const verify = require('../middleware/verify');


router.post('/api/v1/vtrack/', verify, async (req,res) =>{

    const {id, email, name, deviceName, deviceId, temperature, timeStamp, battery, date, Sync} = req.body;

    if(!id || !email || !name || !deviceName || !deviceId || !temperature || !timeStamp || !date){
        return res.status(400).json({status:400, error: "invalid details"});
    }

    try{
       
            const newReading = new Profile({id, email, name, deviceName, deviceId, temperature, timeStamp, battery, date, Sync});
            await VtrackReading.save();
            res.status(200).json({status:200, message:"success"});
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }
})

router.get('/api/v1/vtrack/all/:email/:name', verify, async (req,res) =>{

    const Name = req.params.name;
    const Email = req.params.email;
    try {
        const allReading = await VtrackReading.findOne({name:Name,email:Email});
        res.status(200).json({status:200, message:"success", allreading:allReading});
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }    
})

router.delete('/api/v1/vtrack/del/:email/:name', verify, async (req,res) =>{

    const Name = req.params.name;
    const Email = req.params.email;
    try{
        const readingExist = await VtrackReading.findOne({name:Name,email:Email});
        if(!readingExist){
             return res.status(400).json({status:400, error: "invalid detail"});
         }
         else{
             await VtrackReading.deleteOne({name:Name,email:Email});
             res.status(200).json({status:200, message:"success"});
         }
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
})

router.delete('/api/v1/vtrack/del/:start/:end', verify, async (req,res) =>{

    const startDate = req.params.start;
    const endDate = req.params.end;
    try{
        
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
})

module.exports = router;