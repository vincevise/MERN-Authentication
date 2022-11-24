const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGO_URI

const connectDB = async () =>{
    const res = await mongoose.connect(url)
    if(res){
        console.log('connected Successfully')
    }
}

module.exports = connectDB
