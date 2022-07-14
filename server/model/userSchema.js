const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator')
dotenv.config({path:'./config.env'});

const SECRET_KEY = process.env.SECRET_KEY;

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please provide your workspace email.");
            }
        }
    },
    password:{
        type: String,
        //required: true
    },
    role:{
        type: String,
        default: 'customer'
    },
    createdOn:{
        type : Date,
        default: Date.now
    },
    lastLogged:{
        type : Date,
        default: Date.now
    },
    // shared: [{
    //     type: String
    // }],
    sync:{
        type: String,
        default: 'yes'
    },
    tokens:{
    //[
        //{
            //token:{
                type: String,
                required: true
           // }
        //}
    //]
    }
})

//Token generation
userSchema.methods.generateAuthToken = async function(){

    try {
        const token = jwt.sign({_id:this._id.toString()},SECRET_KEY);
        //this.tokens = this.tokens.concat({token:token});
        this.tokens = token;
        await this.save();
        return token;
    }
    catch (error) {
        //res.send("Error: " + error);
        console.log("Error issue: " + error);
    }
}

//hashing password
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, 12);
    }
    next();
})

const User = mongoose.model('User',userSchema);

module.exports = User;