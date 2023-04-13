const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderDetailSchema = new Schema({
    order:{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity:{
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('OrderDetail', orderDetailSchema)
