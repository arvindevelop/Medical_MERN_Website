const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

/*-------------------------------------------------------------under development-------------------------------------------------------------*/
const session = require('express-session');
const cors = require('cors');
const passportSetup = require('./passport');
const passport = require('passport');

app.use(session({ 
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
})); 

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,PATCH,DELETE",
        credentials: true
    })
);
/*---------------------------------------------------------------under development end---------------------------------------------------------*/

dotenv.config({path:'./config.env'});
require('./db/conn');
app.use(express.json());
app.use(cookieParser());
app.use(require('./router/auth'));
app.use(require('./router/profile'));
app.use(require('./router/device'));
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