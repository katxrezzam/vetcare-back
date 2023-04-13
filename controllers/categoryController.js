const Category = require('../model/Category')

const createCategory = async (req, res) => {
    const {name, description } = req.body
    if(!name || !description) return res.status(204).json({'message': 'Data not found'})
    try{
        const category = await Category.create({name, description})
        await category.save()
        res.json(category)
    } catch (error) {
        res.status(500).json({'message': 'Create category failed'})
    }
}

const getAllCategories = async (req, res) => {
    try{
        const categories = await Category.find().exec()
        if(!categories) res.status(401).json({'message': 'Products not found'})
        res.json(categories)
    } catch (error) {
        res.status(500).json({'message': 'An error occurred'})
    }
}
module.exports = {createCategory, getAllCategories}