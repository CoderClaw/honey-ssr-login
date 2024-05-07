const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://127.0.0.1:27017/login-tut')

//check connection

connect.then(()=>{
    console.log("database connected successfully")
}).catch((err)=>{
    console.log(error)
})

const LoginSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const collection = new mongoose.model("users", LoginSchema)

module.exports = collection;