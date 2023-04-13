const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    address:[{
       type: Schema.Types.ObjectId,
       ref: 'Address'
    }],
    pet:[{
        type: Schema.Types.ObjectId,
        ref: 'Pet'
    }],
    card:[{
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }],
    orders:[{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }],
    refreshToken: String
})

module.exports = mongoose.model('User', userSchema)