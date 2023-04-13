const Order = require('../model/Order')
const OrderDetail = require('../model/OrderDetail')
const Product = require('../model/Product')
const User = require('../model/User')

const createOrder = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({'message': 'Id de usuario requirido'})
    try{
        const id = req.params.id

        const foundUser = await User.findById(id)
        if(!foundUser) return res.status(204).json({'message': 'Usuario no encontrado'})

        const order = await Order.create({user: id})
        await order.save()
        foundUser.order.push(order)
        await foundUser.save()

        const cart = req.body

        cart.map( async (product) => {
            const foundProduct = await Product.findById(product.id)

            if(foundProduct.stock <= product.quantity) return res.status(204).json({'message': 'no stock available'})
            foundProduct.stock = foundProduct.stock - product.quantity
            await foundProduct.save()

            if(foundProduct) {
                console.log(foundProduct)
                const newOrderDetail = await OrderDetail.create({
                    order: order.id,
                    product: foundProduct.id,
                    quantity: product.quantity
                })
                await newOrderDetail.save()
            }
        })
        res.json(order)
    }catch (error){
        console.log(error)
        res.status(500).json({'Message':'La orden no ha podido realizarse'})
    }
}
module.exports = {createOrder}
