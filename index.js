require("dotenv").config()
const express = require("express");
const app = express();
const port = 3100;
const api = require("./router")
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use("/",api)

app.listen(port,()=>{
    console.log(`Server is running in por ${port}`)
})