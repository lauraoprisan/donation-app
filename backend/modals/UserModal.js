const mongoose = require('mongoose')

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
    savedCases: [
        {
            case:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Case",
              }
        }
    ],
    avatarCloudinaryId: {
        type: String,
        required:true
    },
}, {timestamps: true})  //timestamps adds createdAt and lastUpdate

module.exports = mongoose.model('User', userSchema)