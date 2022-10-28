const { getAllContact,getSingleContact, updateContact,deleteAllContact, deleteSingleContact } = require('../controllers/contactControllers')
const express = require('express')
const router = express.Router()

router.route('/')
    .get(getAllContact)
    .delete(deleteAllContact)

router.route('/:id')
    .get(getSingleContact)
    .delete(deleteSingleContact)
    .patch(updateContact)

module.exports = router