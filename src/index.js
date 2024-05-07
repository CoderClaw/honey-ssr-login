const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt")



const app = express();

//view engine

app.set('view engine', 'ejs')

app.get("/", (req,res)=>{
    res.render("login")
})

app.get("/signup", (req,res)=>{
    res.render("signup")
})


const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`server running on port: ${PORT}`)
})