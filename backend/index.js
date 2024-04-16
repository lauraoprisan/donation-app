require('dotenv').config()

const express = require('express')
const PORT = process.env.PORT
const FRONTEND_URL = process.env.FRONTEND_URL
const MONGO_URI = process.env.MONGO_URI
const mongoose = require('mongoose')
const cors = require("cors");

const postRoutes = require('./routes/postsRouter')
const userPostStatusRoutes = require('./routes/userPostStatusRoutes')

//express app
const app = express()

//for cors error
app.use(cors(
    {
        origin: [FRONTEND_URL],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true
    }
));


//middleware
app.use((req,res,next)=>{
    // console.log(req.path,req.method)
    next()
})

app.use(express.json())     //body-parser for raw json, and attaches data to the req object, to req.body
app.use(express.urlencoded({extended:false}))   //for urlencoded

//homepage for backend
app.get("/", (req, res) => {
    res.send("Welcome to the backend");
});

//routes
app.use("/api/posts", postRoutes)
app.use("/api/status", userPostStatusRoutes)

//connect to db
mongoose.connect(MONGO_URI)
    .then(()=>{
        console.log("The app is connected to mongoDB")
        //listen for requests
        app.listen(PORT || 4000, ()=>{
            console.log(`Listening on port ${PORT}`)
            console.log(`App is running in ${process.env.NODE_ENV} mode`)
        })
    })
    .catch((error)=>{
        console.log(error)
    })


    module.exports = app;


