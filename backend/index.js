const express = require('express')
const app = express();
require('dotenv').config()
const connectDB = require('../backend/db/db')

app.use((req , res, next)=>{
    res.setHeader("Access-Control-Allow-origin", "http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers",
        "origin , X-Requested-With, Content-Type, Accept"
    );
    next();
})
const port = process.env.PORT||5000;






// to connect mongo db to server here we call connectDB function which we made in db folder db.js
connectDB();


// middlewear to use json
app.use(express.json());

// middlewer to use Routes 
app.use('/api', require("../backend/Routes/CreateUser"))
app.use('/api', require("../backend/Routes/Displaydata"))
app.use('/api', require("../backend/Routes/OrderData"))


app.get('/' , (req, res)=>{
res.send("Hello world")
});

app.listen(port, ()=>{
    console.log(`GoFood listenig on port ${port}`)
});