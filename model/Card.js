const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardSchema = new Schema({
    number:{
        type: String,
        required: true
    },
    cvv:{
        type: String,
        required: true
    },
    expiresAt:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Card', cardSchema)