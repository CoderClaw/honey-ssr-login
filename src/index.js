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

app.post("/login", async (req, res)=>{
    try {
        const check = await collection.findOne({name: req.body.username})
        if(!check){
            console.log(req.body.username)
            res.send("username not found")
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password)

        if(isPasswordMatch){
            res.render("home")
        }else{
            res.send("incorrect password")
        }

    } catch (error) {
        
    }

   
})

app.get("/signup", (req,res)=>{
    res.render("signup")
})

app.post("/signup", async (req, res)=>{
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    //check if the user already exists
    const existingUser = await collection.findOne({
        name: data.username
    })

    if(existingUser){
        res.send("user already exist")
    }else{

        //hashing the password

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password,saltRounds)

        data.password = hashedPassword;

        const userdata = await collection.insertMany(data)
        res.status(200).send("user added successfully")
    }

   
})

const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`server running on port: ${PORT}`)
})