const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config({path:'../config/details.env'});
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const User = require('../models/userSchema');

const verifyRole = async (req,res,next) => {

    try {
        const token = req.cookies.jwt;
        if(token)
        {
            const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
            // console.log(verifyUser._id);
            const userExist = await User.findOne({_id:verifyUser._id});
            // console.log(userExist);
            if(userExist.role !== 'admin')
            {
                throw "Invalid access permission";
            }
        }
        const GoogleIdToken = req.cookies.GAuth;
        if(GoogleIdToken)
        {
            const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
            const ticket = await client.verifyIdToken({
                idToken: GoogleIdToken,
                audience: CLIENT_ID
            });
            const payload = ticket.getPayload();
            //console.log(payload['email']);
            const userid = payload['sub'];
            const userExist = await User.findOne({_id:userid});
            if(userExist.role !== 'admin')
            {
                throw "Invalid access permission";
            }
        }
        next();
    } 
    catch (error) {
        console.log("error: " + error);
        res.status(406).json({status:406, error:"Invalid access permission"});
    }
}

module.exports = verifyRole;