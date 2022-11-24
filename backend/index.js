const express = require('express')
const connectDB = require('./config/db.js')
const { authRoute } = require('./routes/authRoutes.js')
require('dotenv').config()
const cors = require('cors')

const url = process.env.MONGO_URI
const app = express()
const port = process.env.PORT
connectDB()
 
app.use(cors())
app.use(express.json())
app.use('/api/auth',authRoute)

app.listen(port,()=>console.log(`listening on PORT: ${port}`))