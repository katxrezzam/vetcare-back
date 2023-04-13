const User = require('../model/User');
const Address = require('../model/Address')
const Pet = require('../model/Pet')
const Card = require('../model/Card')

//PERSONAL INFO MANAGEMENT

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const updateUser = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({'message': 'User ID required'})
    const id = req.params.id
    const user = await User.findOne({ _id: id }).exec()
    if(!user){
        return  res.status(204).json({'message': 'No hay un usuario que coincida con el ID'})
    }
    const {firstName, lastName, phone, dni } = req.body

    if(firstName) user.firstName = firstName
    if(lastName) user.lastName = lastName
    if(phone) user.phone = phone
    if(dni) user.dni = dni

    const result = await user.save()
    res.json(result)

}

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    }
    const result = await user.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
}

//ADDRESS MANAGEMENT

const getAllAddress = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const foundUser = await Address.find({user: req.params.id}).exec()
    if(!foundUser)  return res.status(204).json({ 'message': 'No address Found' });
    console.log(foundUser)
    res.json(foundUser)

}

const createAddress =  async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const id = req.params.id

    const userById = await User.findById(id)
    if(!userById) return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });

    const { name, phone, street, streetNumber, district, region } = req.body
    const address = await Address.create({
        name,
        phone,
        street,
        streetNumber,
        district,
        region,
        user:id
    })
    await address.save()

    userById.address.push(address)
    await userById.save()
    return res.json(address)
}

const deleteAddress = async (req, res) => {
    if(!req?.params?.id_address) return res.status(400).json({'message': 'Address ID  required'})
    const id = req.params.id_address

    const foundAddress = await Address.findById(id)
    if(!foundAddress) return res.status(204).json({ 'message': `Address ID ${id} not found`})
    const userId = foundAddress.user._id
    const userById = await  User.findById(userId)
    if(!userById) return res.status(204).json({ 'message': `User ID ${id} not found`})
    const result = await Address.deleteOne({_id: id})
    userById.address.pop(foundAddress)
    res.json(result)
}

const modifyAddress = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({'message': 'USER ID  required'})
    if(!req?.params?.id_address) return res.status(400).json({'message' : 'ADDRESS ID required'})
    
    const id = req.params.id
    const id_address = req.params.id_address

    const foundUser = await User.findById(id)
    if(!foundUser) return res.status(204).json({'message': `User ID ${id} not found`})

    const foundAddress = await Address.findById(id_address)
    if(!foundAddress) return  res.status(204).json({'message': `Address ID ${id_address} not found`})

    const {name, phone, street, streetNumber, district, region,} = req.body
    if(name) foundAddress.name = name
    if(phone) foundAddress.phone = phone
    if(street) foundAddress.street = street
    if(streetNumber) foundAddress.streetNumber = streetNumber
    if(district) foundAddress.district = district
    if(region) foundAddress.region = region

    const result = await foundAddress.save()
    res.json(result)
}


// PETS MANAGEMENT

const getAllPets = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({'message': 'User ID required'})
    const foundPets = await  Pet.find({user: req.params.id}).exec()
    if(!foundPets) return res.status(204).json({'message': 'No pets found'})
    console.log(foundPets)
    res.json(foundPets)
}

const createPet = async (req, res) => {

    if(!req?.params?.id) return res.status(400).json({'message': 'User ID required'})
    const id = req.params.id
    const foundUser = await User.findById(id)
    if(!foundUser) res.status(204).json({'message' : `User ${id} not found`})

    const { name, breed, age, kind, sex } = req.body
    const pet = await Pet.create({ name, kind, breed, sex, age, user: id })
    await pet.save()

    foundUser.pet.push(pet)
    await foundUser.save()
    res.json(pet)
}

const deletePet = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({'message': 'User ID required'})
    if(!req?.params?.id_pet) return res.status(400).json({'message': 'Pet ID required'})

    const id = req.params.id
    const id_pet = req.params.id_pet

    const foundPet = await Pet.findById(id_pet)
    if(!foundPet) res.status(204).json({'message': 'Mascota no encontrada'})

    const foundUser = await User.findById(id)
    if(!foundUser) res.status(204).json({'message' : `User ${id} not found`})

    const result = await Pet.deleteOne({_id: id_pet})
    foundUser.pet.pop(foundPet)
    
    res.json(result)
}

const modifyPet = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({'message': ''})
}

//CARD MANAGEMENT

const getAllCards = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({'message': 'USER id required'})
    const id = req.params.id

    const foundCard = await Card.find({user: id}).exec()
    if(!foundCard) return  res.status(204).json({'message': 'No card found'})
    res.json(foundCard)
}

const createCard = async (req, res) => {
    if(!req?.params.id) return res.status(400).json({'message': 'USER id required'})
    const id = req.params.id

    const foundUser = await User.findById(id)
    if(!foundUser) return res.status(204).json({'message': 'No card found'})

    const {number, cvv, expiresAt, name, dni } = req.body
    const card = await Card.create({name, number, cvv, expiresAt, dni, user: id})
    await card.save()
    foundUser.card.push(card)
    await foundUser.save()
    res.json(card)
}

const deleteCard = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({'message': 'User ID required'})
    if(!req?.params?.id_card) return res.status(400).json({'message': 'Card ID required'})

    const id = req.params.id
    const id_card = req.params.id_card

    const foundCard = await Card.findById(id_card)
    if(!foundCard) res.status(204).json({'message': ' Tarjeta no encontrada'})

    const foundUser = await User.findById(id)
    if(!foundUser) res.status(204).json({'message' : `User ${id} not found`})

    const result = await Card.deleteOne({_id: id_card})
    foundUser.card.pop(foundCard)

    res.json(result)
}

module.exports = {
    getAllUsers,
    deleteUser,
    getUser,
    updateUser,
    getAllAddress,
    createAddress,
    deleteAddress,
    modifyAddress,
    getAllPets,
    createPet,
    deletePet,
    modifyPet,
    getAllCards,
    createCard,
    deleteCard
}