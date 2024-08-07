const express = require('express');
const dotenv = require('dotenv')
const connectDB = require("./config/database")

dotenv.config()
const authRoutes = require("./routes/auth.routes")

const app = express();

app.use(express.json())


app.use("/api/auth", authRoutes)


connectDB()
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})