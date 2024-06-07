const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)
    const {username, isAdmin, _id} = user

    // console.log("user who logged in:", user)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, username, isAdmin, token, _id})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password, username} = req.body

  try {
    const user = await User.signup(email, password, username)
    const {isAdmin, _id} = user

    // console.log("user who signed up:", user)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, username, isAdmin, token, _id})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


module.exports = { signupUser, loginUser }