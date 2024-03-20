const mongoose = require('mongoose')

const Schema = mongoose.schema

const caseSchema = new Schema({
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
    inOneTimeNeed: {
        type: Boolean,
        required:true
    },
    timeLimit: {
        type: String,
        required:true
    },
    tags: {
        type: String,
        required:false
    },
    cloudinaryId: {
        type: String,
        required:true
    }
}, {timestamps: true})  //timestamps adds createdAt and lastUpdate