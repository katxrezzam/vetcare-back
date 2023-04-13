const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const upload = require('../../middleware/multer')

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser)
    .put(verifyRoles(ROLES_LIST.User), usersController.updateUser)

//address

router.route('/:id/address')
    .get(verifyRoles(ROLES_LIST.User), usersController.getAllAddress)
    .post(verifyRoles(ROLES_LIST.User), usersController.createAddress)

router.route('/:id/address/:id_address')
    .delete(verifyRoles(ROLES_LIST.User), usersController.deleteAddress)
    .put(verifyRoles(ROLES_LIST.User), usersController.modifyAddress)

//pet
router.route('/:id/pet')
    .get(verifyRoles(ROLES_LIST.User), usersController.getAllPets)
    .post(verifyRoles(ROLES_LIST.User), upload.single('imagePet'), usersController.createPet)

router.route('/:id/pet/:id_pet')
    .delete(verifyRoles(ROLES_LIST.User), usersController.deletePet)
    

//cards
router.route('/:id/card')
    .get(verifyRoles(ROLES_LIST.User), usersController.getAllCards)
    .post(verifyRoles(ROLES_LIST.User), usersController.createCard)

router.route('/:id/card/:id_card')
    .delete(verifyRoles(ROLES_LIST.User),usersController.deleteCard)

module.exports = router;
