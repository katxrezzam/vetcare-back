const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addressSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
      type: String,
      required: true
    },
    street:{
        type: String,
        required: true
    },
    streetNumber:{
        type: String,
        required: true
    },
    district:{
        type: String,
        required: true
    },
    region:{
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Address', addressSchema)