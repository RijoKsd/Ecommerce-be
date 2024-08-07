const express = require('express');
const dotenv = require('dotenv')
const connectDB = require("./config/database")

const app = express();

dotenv.config()
app.use(express.json())

connectDB()
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})