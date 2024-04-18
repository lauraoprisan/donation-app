const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.schema

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Please add an email'],
        unique:true
    },
    password: {
        type: String,
        require: [true, 'Please add a password']
    },
    username: {
        type: String,
        require: [true, 'Please add an username'],
        unique:true
    },
    isAdmin: {
        type: Boolean,
        required:true
    },
    savedPosts: [
        {
            post:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
              }
        }
    ],
    avatarCloudinaryId: {
        type: String,
        required:false
    },
}, {timestamps: true})  //timestamps adds createdAt and lastUpdate

// static signup method
userSchema.statics.signup = async function(email, password, username) {

    // validation
    if (!email || !password || !username) {
      throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
      throw Error('Email not valid')
    }
    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })

    if (exists) {
      throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    let isAdmin = false;
    if(email === "admin-demo@admin-demo.com" && password === "Admin123!"){
        isAdmin = true;
    }
    
    const user = await this.create({ email, password: hash, username, isAdmin})

    return user
  }

  // static login method
  userSchema.statics.login = async function(email, password) {

    if (!email || !password) {
      throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })
    if (!user) {
      throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw Error('Incorrect password')
    }

    return user
  }


module.exports = mongoose.model('User', userSchema)