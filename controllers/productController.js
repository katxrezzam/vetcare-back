const Product = require('../model/Product')

const createProduct = async (req, res) => {
    const {name, price, description, category, stock} = req.body
    if(!name || !price || !description || !category || !stock) return res.status(204).json({'message' : 'Data most be fullfiled'})
    try {
        const product = await Product.create({name, price, description, category, stock})
        await product.save()
        res.json(product)
    } catch (error) {
        console.log(error)

        res.status(500).json({'message': 'Create product failed'})
    }
}

const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find().exec()
        if(!products) return res.status(200).json({'message': 'Products not found'})
        res.json(products)
    } catch (error){
        res.status(500).json({'message': 'An error occurred'})
    }
}
module.exports = {createProduct, getAllProducts}