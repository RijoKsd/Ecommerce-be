const express = require('express');
const dotenv = require('dotenv')
const connectDB = require("./config/database")

const authRoutes = require("./routes/auth.routes")
const productRoutes = require("./routes/product.routes")
const userRoutes = require("./routes/user.routes")
const adminRoutes = require("./routes/admin.routes")
dotenv.config()
const app = express();

app.use(express.json())


app.use("/api/auth", authRoutes)
app.use("/api/product", productRoutes)
app.use("/api/user", userRoutes)
app.use("/api/admin", adminRoutes)


connectDB()
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})