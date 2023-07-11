const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
//dotenv
require('dotenv').config({ path: './.env' })
const port = process.env.PORT || 5000

//middleware
app.use(cors())
app.use(express.json())


//using routes
app.use(require('./routes/route'))

//mongodb connection
mongoose.set("strictQuery", true);
const conn = require('./db/connection')
conn
    .then(db => {
        if (!db) return process.exit()
        //listen to thhp server only if connection is established
        app.listen(port, () => console.log('running server on', port))
    })
    .catch(err => console.log(err))


app.on('error', err => console.log('connection failed', err))


