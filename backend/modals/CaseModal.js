const mongoose = require('mongoose')

const Schema = mongoose.schema

const caseSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    location: {
        type: String,
        required:true
    },
    needs: {
        type: String,
        required:true
    },
    personDescription: {
        type: String,
        required:true
    },
    isOneTimeNeed: {
        type: Boolean,
        required:true
    },
    timeLimit: {
        type: String,
        required:true
    },
    tag: {
        type: String,
        required:false
    },
    image: {
        type: String,
        require: false,
      },
    cloudinaryId: {
        type: String,
        required:false
    }
}, {timestamps: true})  //timestamps adds createdAt and lastUpdate

module.exports = mongoose.model('Case', caseSchema)