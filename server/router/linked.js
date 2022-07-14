const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Linked = require('../model/linkedSchema');
dotenv.config({path:'../config.env'});
const verify = require('../middleware/verify');


router.post('/api/v1/linked/', verify, async (req,res) =>{

    
})

router.get('/api/v1/linked/', verify, async (req,res) =>{

    
})


router.get('/api/v1/linked/:name', verify, async (req,res) =>{

    
})

router.delete('/api/v1/linked/:name', verify, async (req,res) =>{

    
})

router.put('/api/v1/linked/:name', verify, async (req,res) =>{

    
})

module.exports = router;