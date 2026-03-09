require("dotenv").config()
const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const User=require('../models/userModel') // while i have to ../like this means one folder down

const router=express.Router()

router.post('/Register',async(req,res) => {
    console.log(req.body)
    const name=req.body.name
    const email=req.body.email
    const role=req.body.role
    const password=req.body.password

    console.log(name)

    if (!email ||!password|| !role){
        return res.json({"message":"invalid request"})
    }
    const usercheck=await User.findOne({email:email})
    console.log("usercheck:",usercheck)
    if(usercheck){
        return res.json({"message":"email already exist"})
    }

    const hashedPassword=await bcrypt.hash(password,10)
    const user =new User({
        name:name,
        email:email,
        password:hashedPassword,
        role:role
        
    })
    await user.save()
    return res.json({"message":"sucess"})
})
router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.json({ message: "Email is invalid" })
        }

        const isPasswordMatching = await bcrypt.compare(
            req.body.password,
            user.password
        )

        if (!isPasswordMatching) {
            return res.json({ message: "password invalid" })
        }

        const token = jwt.sign(
            {
                _id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        return res.json({
            message: "login successful",
            token: token
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" })
    }
})
module.exports=router
