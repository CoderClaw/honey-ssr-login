const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt")
const collection = require("./config")


const app = express();
app.use(express.json())

app.use(express.urlencoded({extended: false}))

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

//static folder
app.use(express.static("public"))

app.get("/", (req,res)=>{
    res.render("login")
})

app.get("/signup", (req,res)=>{
    res.render("signup")
})

app.post("/signup", async (req, res)=>{
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    const userdata = await collection.insertMany(data)
    res.status(200).send("user added successfully")
})

const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`server running on port: ${PORT}`)
})