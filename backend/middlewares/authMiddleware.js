const jwt = require('jsonwebtoken')
const { authModel } = require('../models/authModel')

const checkIsUserAuthenticated = async(req,res,next) =>{
    let token
    const {authorization} = req.headers;
    if(!authorization || !authorization.startsWith('Bearer')){
        return res
            .status(401)
            .json({message:"unAUthorized User"})
    } 

    try{
        token = authorization.split(" ")[1];
        // verify token
        const {userID} = jwt.verify(token, process.env.SECRET_KEY)
        // Get User from Token

        req.user = await authModel.findById(userID).select("--password")
        next()

    }catch(error){
        return res.status(401).json({message: error.message})
    }
}

module.exports = checkIsUserAuthenticated