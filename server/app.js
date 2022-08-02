const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
dotenv.config({path:'./config/details.env'});
require('./config/dbConn');
/*-------------------------------------------------------------under development-------------------------------------------------------------*/
const session = require('express-session');
const cors = require('cors');
// const passportSetup = require('./passport');
// const passport = require('passport');

app.use(session({ 
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }  // Put false if not https
})); 

// app.use(passport.initialize());
// app.use(passport.session());

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,PATCH,DELETE",
        credentials: true
    })
);
/*---------------------------------------------------------------under development end---------------------------------------------------------*/
app.use(express.json());
app.use(cookieParser());
app.use(require('./routes/auth'));
app.use(require('./routes/profile'));
app.use(require('./routes/device'));
app.use(require('./routes/vtrack'));
// app.use(require('./middleware/verify'));

const PORT = process.env.PORT || 5000;

// app.get('/',(req,res) => {
//     res.send(`At home`);
// })

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Server is running at port ${PORT}`);
})