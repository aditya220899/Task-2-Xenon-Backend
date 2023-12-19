const mongoose = require('mongoose');




const ContactUsSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  mobile : {
    type : String,
    required : true,
    unique : true
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  query:{
    type:String,
    required:true
  }
})

const ContactUs = mongoose.model('ContactUs', ContactUsSchema);

module.exports = ContactUs;