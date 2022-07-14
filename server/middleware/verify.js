const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config({path:'../config.env'});
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verify = async (req,res,next) => {

    try {
        const token = req.cookies.jwt;
        if(token)
        {
            const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
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
        }
        next();
    } 
    catch (error) {
        console.log("error: " + error);
        res.status(401).send("Please register/Login: " + error);
    }
}

module.exports = verify;