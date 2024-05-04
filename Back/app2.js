const express = require('express')
const mongoose = require('mongoose')
const taskRoutes = require('./routes/taskRoutes')
const cors = require('cors');

const app = express()
const port = 4000

// Middleware
app.use(express.json())
app.use(cors());

// DB connection
mongoose.connect('mongodb://admin:admin@localhost:27017/todo?authSource=admin')

const db = mongoose.connection;

db.on('error',()=>{
    console.log("connection error!")
})

db.once('open',()=>{
    console.log("connected to db!")
})

app.use('/api',taskRoutes)

app.listen(port,()=>{
    console.log("server started on port 4000")
})


