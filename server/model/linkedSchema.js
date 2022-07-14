const mongoose = require('mongoose');
const validator = require('validator')

const linkedSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    main_email:{
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please provide correct email.");
            }
        }
    },
    linked_email:{
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please provide correct email.");
            }
        }
    },
    linked_name:{
        type: String,
        required: true
    },
    profileName:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    sync:{
        type:String,
        default:'yes'
    }
})


const Linked = mongoose.model('Linked',linkedSchema);

module.exports = Linked;