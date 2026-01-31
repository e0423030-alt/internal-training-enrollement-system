require("dotenv").config()
const express = require("express")
const connectDB = require("./config/db")
const userApi = require("./api/userApi")
const requestApi = require("./api/requestApi")

const app = express()// app will create

app.use(express.json())

connectDB()

app.use("/user", userApi)
app.use("/request", requestApi)
app.listen(process.env.PORT, () => {
    console.log("server is running on port", process.env.PORT)
})  