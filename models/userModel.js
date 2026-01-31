const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    role:{
        type:String,
        enum:["EMPLOYEE","TRIANER"]
    },
    password:String
},

{
    timestamps: true
}
);
const User=mongoose.model("User",userSchema);

module.exports=User;