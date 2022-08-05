const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/userSchema');
dotenv.config({path:'../config/details.env'});
const verify = require('../middleware/verify');

router.get('/forgot-password',async (req,res) => {

})

router.post('/forgot-password',async (req,res) => {

})

router.get('/reset-password',async (req,res) => {

})

router.post('/reset-password',async (req,res) => {

})