const express = require('express')
const jwt = require('jsonwebtoken')

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set('view engine','ejs')

let user  = {
    id:"hsfhfghdfgsfcvh234",
    email:"arvi@gmail.com",
    password:"sdjfgjdgfgg;'wdfgfghsjhhdvhshh"
};

const JWT_SECRET = 'some super secrret....';

app.get('/',(req,res) => {
    res.send('Hello world!');
})

app.get('/forgot-password',async (req,res,next) => {
    res.render('forgot-password');
});

app.post('/forgot-password',async (req,res,next) => {
    const {email} = req.body;
    
    //make sure user exist in db
    if(email !== user.email)
    {
        res.send('User not registered');
        return;
    }

    //user exist and now create a one time link that is avalid for 15 min
    const secret = JWT_SECRET + user.password;
    const payload = {
        email : user.email,
        id: user.id
    }
    const token = jwt.sign(payload,secret,{expiresIn:'15m'})
    const link = `http://localhost:3000/reset-password/${user.id}/${token}`
    console.log(link)
    res.send('password reset link has been sent to ur email...')
});

app.get('/reset-password/:id/:token',async (req,res,next) => {
    const {id,token} = req.params
    //check if this id exist in database
    if(id !== user.id)
    {
        res.send('Invalid Id...')
        return;
    }

    //we have a valid id, and we have a valid user with this id
    const secret = JWT_SECRET + user.password;
    try{
        const payload = jwt.verify(token,secret);
        res.render('reset-password',{email:user.email});
    }
    catch(error)
    {
        console.log(error.message);
        res.send(error.message);
    }
});

app.post('/reset-password/:id/:token',async (req,res,next) => {
    const {id,token} = req.params;
    const {password,password2} = req.body;
    if(id !== user.id)
    {
        res.send('Invalid Id...')
        return;
    }

    const secret = JWT_SECRET + user.password;
    try {
        const payload = jwt.verify(token,secret);
        //validate password and password2 match
        //always hash the password before saving
        user.password = password;
        res.send(user)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
});

app.listen(3000, () => console.log('object @ http://localhost:3000'))