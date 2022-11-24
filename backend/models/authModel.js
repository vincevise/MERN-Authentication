const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
    },
    password:{
        type:String
    }
})

const authModel = mongoose.model("user",authSchema)
module.exports = {
    authModel
}
