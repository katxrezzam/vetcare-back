const express = require('express')
const router = express.Router()
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')
const checkOutController = require('../../controllers/checkOutController')

router.post('/:id', verifyRoles(ROLES_LIST.User), checkOutController.createOrder)

module.exports = router