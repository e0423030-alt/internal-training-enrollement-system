const express=require("express")
const connectDB=require("./config/db")
const userApi=require("./api/userApi")

const app=express()
app.use(express.json())

connectDB()

app.use("/users",userApi) //if we have //users behind any cmd we have to handle that userApi file

app.listen(4000,() =>{
    console.log("server is running on",4000)
})
