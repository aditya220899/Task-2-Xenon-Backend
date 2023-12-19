const mongoose = require('mongoose');




const UserSchema = new mongoose.Schema({
    name : {
        type :  String,
        required  : true
    },
    mobile  : {
        type :  String,
        required  : true,
        unique :  true
    },
    email : {
        type :  String,
        required  : true,
        unique :  true
    },
    address : {
        type :  String,
        required  : true
    },
    password : {
        type :  String,
        required  : true
    },
    gender :{
        type :  String,
        required  : true
    },
    all_addresses : {
        type : Array
    }



})

const user = mongoose.model('users', UserSchema);

module.exports = user;