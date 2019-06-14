// imports
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// connection uri
const username = 'fintrack'
const password = 'nfactorialsorting'
const server = 'fintrack-snwv2.mongodb.net'
const database = 'fintrack_database'
const uri = `mongodb+srv://${username}:${password}@${server}/${database}?retryWrites=true&w=majority`

// connect to database
mongoose
  .connect(uri, {
    useNewUrlParser: true, 
    useCreateIndex: true,
    dbName: 'fintrack_database',
  })
  .then(
    () => console.log('connected successfully to database [UserModel.js]'),
    err => console.log(`connection error to database [UserModel.js]\nerror: ${err}`)
  )

const UserSchema = new Schema({
  name: { 
    type: String, 
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User