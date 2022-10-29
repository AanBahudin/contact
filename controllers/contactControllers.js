const {StatusCodes} = require('http-status-codes')
const Contact = require('../models/Contact')

const addContact = async(req, res) => {
    const {name, email, phone} = req.body

    if(!name) {
        res.status(StatusCodes.BAD_REQUEST).json({success: false, msg: 'Please atleast provide contact name'})
    }

    const contact = await Contact.create({name, email: email ? email : '-', phone: phone ? phone : '-'});
    res.status(StatusCodes.OK).json({success: true, message: 'Successfully adding new contact', data: {contact}})
}

const getAllContact = async(req, res) => {
    const contact = await Contact.find({});

    res.status(StatusCodes.OK).json( {status: {success: true,msg: 'Successfully get all contact',response_code: 200},results: contact,total_contact: contact.length})
}

const getSingleContact = async(req, res) => {
    const {id} = req.params

    const contact = await Contact.findOne({_id: id});

    if(!contact) {
        res.status(StatusCodes.NOT_FOUND).json({
            status: {
                success: false,
                msg: `Cannont find contact with id : ${id}`,
                response_code: 404
            },
            results: []
        })
    }

    res.status(StatusCodes.OK).json(
        {
            status: {
                success: true,
                msg: 'Successfully get single contact',
                response_code: 200
            },
            results: contact,
        }
    )    

}

const deleteSingleContact = async(req, res) => {
    const {id} = req.params;

    const contact = await Contact.findByIdAndDelete({_id: id})

    if(!contact) {
        res.status(StatusCodes.NOT_FOUND).json({status: { success: false, msg: `Cannont find contact with id : ${id}`, response_code: 404},results: []})
    }    

    res.status(StatusCodes.OK).json({status: {success: true, msg: 'Successfully get delete contact', response_code: 200}})

}

const deleteAllContact = async(req, res) => {
    const contact = await Contact.deleteMany({});
    res.status(StatusCodes.OK).json({status: {success: true, msg: 'Successfully delete all contact', response_code: 200}})
}

const updateContact = async(req, res) => {
    const {id} = req.params;
    const {name, email, phone} = req.body

    const contact = await Contact.findOne({_id: id})
    if(!contact) {
        res.status(StatusCodes.NOT_FOUND).json({status: {success: false, msg: `Cannont find and update contact with id : ${id}`, response_code: 404}, results: []})
    }

    // overiding value
    contact.name = name ? name : contact.name
    contact.email = email ? email : contact.email
    contact.phone = phone ? phone : contact.phone

    await contact.save()
    res.status(StatusCodes.OK).json({status: {success: true, msg: 'Successfully update contact', response_code: 200}, results: contact })

}

module.exports = {
    addContact,
    getAllContact,
    getSingleContact,
    deleteAllContact,
    deleteSingleContact,
    updateContact
}