const { addContact, getAllContact,getSingleContact, updateContact,deleteAllContact, deleteSingleContact } = require('../controllers/contactControllers')
const express = require('express')
const router = express.Router()
const {authenticateUser} = require('../middleware/authenticated')

router.route('/')
    .post(authenticateUser, addContact)
    .get(authenticateUser, getAllContact)
    .delete(authenticateUser, deleteAllContact)

router.route('/:id')
    .get(authenticateUser, getSingleContact)
    .delete(authenticateUser, deleteSingleContact)
    .patch(authenticateUser, updateContact)

module.exports = router