const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const invoice = require('./routes/api/invoice')

const app = express()

// middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api/invoice', invoice)

// db

const db = 'mongodb+srv://matt:matt123@cc-test-kqmkk.mongodb.net/test?retryWrites=true'
const opts = {
  useNewUrlParser: true,
  dbName: 'cc-test'
}

mongoose.Promise = global.Promise
mongoose
  .connect(db, opts)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on Port ${port}`))
