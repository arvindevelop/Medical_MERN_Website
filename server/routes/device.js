const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Device = require('../models/deviceSchema');
dotenv.config({path:'../config/details.env'});
const verify = require('../middleware/verify');


router.post('/api/v1/device/', verify, async (req,res) =>{

    const {_id, email, deviceName,  deviceType, deviceId} = req.body;

    if(!_id || !email || !deviceName || !deviceType || !deviceId){
        return res.status(400).json({status:400, error: "Client error"});
    }

    try{
       const deviceExist = await Device.findOne({_id:_id});

       if(deviceExist){
            return res.status(400).json({status:400, message: "Client error"});
        }
        else{
            const device = new Device(req.body);
            const savedDevice = await device.save();
            res.status(201).json({status:201, message:"success", deviceData:savedDevice});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }
})

router.get('/api/v1/device/', verify, async (req,res) =>{

    try {
        const allDevice = await Device.find({});
        res.status(200).json({status:200, message:"success", allDevice:allDevice});
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }    
})

router.get('/api/v1/device/:id', verify, async (req,res) =>{

    const _id = req.params.id;
    try {
        const singleDevice = await Device.findone({_id:__dirname});
        res.status(200).json({status:200, message:"success", singleDevice:singleDevice});
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }    
})

router.delete('/api/v1/device/:id', verify, async (req,res) =>{

    const _id = req.params.id;
    try{
        const deviceExist = await Device.findOne({_id:_id});
 
        if(!deviceExist){
             return res.status(406).json({status:406, error: "Does not exist"});
         }
         else{
             await Device.deleteOne({deviceId:DeviceId});
             res.status(200).json({status:200, message:"success"});
         }
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
})

router.patch('/api/v1/device/:id', verify, async (req,res) =>{

    const _id = req.params.id;
    //var {deviceName, deviceAddress} = req.body;
    try{
        const deviceExist = await Device.findOne({_id:_id});
        if(!deviceExist){
             return res.status(406).json({status:406, error: "Does not exist"});
         }
         else{
            await Device.updateOne({_id:_id},{$set : req.body});
            res.status(200).json({status:200, message:"success"});
         }
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
})

module.exports = router;