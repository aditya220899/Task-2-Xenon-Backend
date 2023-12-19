const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/MyDB');

const db = mongoose.connection;


db.on('error' , function(){
    console.log("Error in connection with Mongo-DB")
})
db.once('open' , function(){
    console.log("Successfully connected with Mongo-DB")
})


module.exports = db