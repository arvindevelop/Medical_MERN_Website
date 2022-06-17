const express = require('express');
const router = express.Router();

const Device = require('../model/deviceSchema');

router.post('/api/v1/device/new', async (req,res) =>{

    const {email, deviceName,  deviceType, deviceId, deviceAddress} = req.body;

    if(!email || !deviceName || !deviceType || !deviceId || !deviceAddress){
        return res.status(400).json({error: "invalid details"});
    }

    try{
       const deviceExist = await Device.findOne({deviceId:deviceId});

       if(deviceExist){
            return res.status(400).json({message: "Device already exist"});
        }
        
        else{
            const device = new Device({email, deviceName,  deviceType, deviceId, deviceAddress});
            
            const savedDevice = await device.save();
            res.status(200).json({status:"success", deviceData:savedDevice});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"server error"});
    }
    
})

router.get('/api/v1/device/all', async (req,res) =>{

    try {
        const allDevice = await Device.find({});
        res.status(200).json({status:"success", allDevice:allDevice});
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({error:"server error"});
    }    
})

router.delete('/api/v1/device/del/:deviceId', async (req,res) =>{

    const deviceId = req.params.deviceId;
    try{
        const deviceExist = await Device.findOne({deviceId:deviceId});
 
        if(!deviceExist){
             return res.status(400).json({error: "invalid detail"});
         }
         
         else{
             await Device.deleteOne({deviceId:deviceId});
             res.status(200).json({message:"success"});
         }
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
    
})

router.patch('/api/v1/device/update/:deviceId', async (req,res) =>{

    const deviceId = req.params.deviceId;
    var {deviceName, deviceAddress} = req.body;
    try{
        const deviceExist = await Device.findOne({deviceId:deviceId});
        if(!deviceExist){
             return res.status(400).json({error: "invalid detail"});
         }
         
         else{
            await Device.updateOne({deviceId:deviceId},{$set : { 'deviceName' : deviceName, 'deviceAddress' : deviceAddress, 'lastUpdate' : Date.now()}});
            res.status(200).json({message:"success"});
         }
     }
     catch(err){
         console.log(err);
         res.status(500).json({status:500, error:"server error"});
     }
})

module.exports = router;