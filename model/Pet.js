const mongoose = require('mongoose')
const Schema = mongoose.Schema

const petSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    kind:{
        type: String,
        required: true
    },
    breed:{
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true
    },
    sex:{
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Pet', petSchema)