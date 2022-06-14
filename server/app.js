const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

dotenv.config({path:'./config.env'});
require('./db/conn');
app.use(express.json());
app.use(cookieParser());
app.use(require('./router/auth'));

const PORT = process.env.PORT;

app.get('/',(req,res) => {
    res.send(``);
})


app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Server is running at port ${PORT}`);
})