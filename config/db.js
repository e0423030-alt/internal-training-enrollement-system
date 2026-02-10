require("dotenv").config()
const mongoose = require("mongoose")

module.exports = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Database connected")
    } catch (err) {
        console.log("DB connection error:", err)
    }
}
