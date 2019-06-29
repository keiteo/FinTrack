// imports
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// connection uri
const db = require('../configs/mongodbConfig')
const uri = db.uri(db.username, db.password, db.server, db.database)

// connect to database
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    dbName: "fintrack_database"
  })
  .then(() => console.log("connected successfully to database [User]"))
  .catch(err =>console.log(`connection error to database [User]\nerror: ${err}`))

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  symbol: [],
})

UserSchema.index({ username: "text" })

const User = mongoose.model("User", UserSchema)

module.exports = User
