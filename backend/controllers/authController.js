const { authModel } = require("../models/authModel")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
require('dotenv').config({path:'../.env'})

const userRegistration = async(req,res) => {
    const {name,email,password} = req.body
    
    try{
        if(!name || !email || !password){
            return res.status(400).json({message:'Please fill all the details'})
        }
        const user = await authModel.findOne({email:email})
        if(user){
            return res.status(400).json({message:'User already exsist'})
        }
        const genSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, genSalt)

        const newUser = await authModel.create({name,email,password:hashedPassword })
        res.status(200).json({msg:newUser})

    }catch(error){
        return res.status(400).json({message:error.message})
    }
}

const userLogin = async(req,res) => {
    const {email,password} = req.body
    try{
        if(!email || !password){
            return res.status(400).json({message:'Please fill all the details'})
        }

        const isUser = await authModel.findOne({email:email})
        if(!isUser){
            return res.status(400).json({message: 'Invalid username and password isUser'})
        }

        const isMatch = await bcrypt.compare(password, isUser.password)
        if(!isMatch){
            return res.status(400).json({
                message:'Invalid username and password isMatch'
            })
        }

        const token = jwt.sign(
            {userID:isUser._id},
            process.env.SECRET_KEY,
            {expiresIn:'2d'}
            )

        
        res.status(200).json({
            username:isUser.name,
            token:token
        })

    }catch(error){
        return res.status(400).json({message:error.message})
    }
}

const changePassword = async (req,res) => {
    const {newpassword,confirmpassword} = req.body
    try{
        if(!newpassword || !confirmpassword){
            return res.status(400).json({message:'password and confirm password does not match'})
        }
        if(newpassword !== confirmpassword){
            return res.status(400).json({message:'password and confirm password does not match'})
        }
        const gensalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newpassword,gensalt)
        await authModel.findByIdAndUpdate(req.user._id,{
            password:hashedPassword
        })

        res.status(200).json({message:'Password changed successfully'})
    }catch(error){
        return res.status(400).json({message:error.message})
    }
}

module.exports = {
    userRegistration,userLogin,changePassword
}