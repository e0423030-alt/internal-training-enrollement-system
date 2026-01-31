const mongoose=require("mongoose")
const requestSchema = new mongoose.Schema({
    training: String,
    description: String,
    status: String,
    createdon: {
        type: Date,
        default: Date.now
    },
    enrolledon: Date,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    enrolledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

})

const Request=mongoose.model("Request",requestSchema)
module.exports=Request
