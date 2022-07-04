const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Device = require('../model/deviceSchema');
dotenv.config({path:'../config.env'});
const verify = require('../middleware/verify');


router.post('/api/v1/device/new', verify, async (req,res) =>{

    const {_id, email, deviceName,  deviceType, deviceId, deviceAddress} = req.body;

    if(_id || !email || !deviceName || !deviceType || !deviceId || !deviceAddress){
        return res.status(400).json({status:400, error: "invalid details"});
    }

    try{
       const deviceExist = await Device.findOne({deviceId:deviceId});

       if(deviceExist){
            return res.status(400).json({status:400, message: "Device already exist"});
        }
        else{
            const device = new Device(req.body);
            const savedDevice = await device.save();
            res.status(200).json({status:400, message:"success", deviceData:savedDevice});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }
})

router.get('/api/v1/device/all', verify, async (req,res) =>{

    try {
        const allDevice = await Device.find({});
        res.status(200).json({status:200, message:"success", allDevice:allDevice});
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({status:500, error:"server error"});
    }    
})

router.delete('/api/v1/device/del/:deviceId', verify, async (req,res) =>{

    const deviceId = req.params.deviceId;
    try{
        const deviceExist = await Device.findOne({deviceId:deviceId});
 
        if(!deviceExist){
             return res.status(400).json({status:400, error: "invalid detail"});
         }
         else{
             await Device.deleteOne({deviceId:deviceId});
             res.status(200).json({status:200, message:"success"});
         }
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
})

router.patch('/api/v1/device/update/:deviceId', verify, async (req,res) =>{

    const deviceId = req.params.deviceId;
    var {deviceName, deviceAddress} = req.body;
    try{
        const deviceExist = await Device.findOne({deviceId:deviceId});
        if(!deviceExist){
             return res.status(400).json({status:400, error: "invalid detail"});
         }
         else{
            await Device.updateOne({deviceId:deviceId},{$set : { 'deviceName' : deviceName, 'deviceAddress' : deviceAddress, 'lastUpdate' : Date.now()}});
            res.status(200).json({status:200, message:"success"});
         }
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
})

module.exports = router;