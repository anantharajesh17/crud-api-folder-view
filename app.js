const express = require('express');
const dotenv = require('dotenv').config();
const port = 7000 || process.env.port;
const app = express();
app.use(express.json());
const mongoose = require("./mongoose/connection")
const route =require("./routes/userRoutes")
app.use("/user",route);
app.listen(port,()=>{
    console.log(`serve running on http://localhost:${port}`);
})