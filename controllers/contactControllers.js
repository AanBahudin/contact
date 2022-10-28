
const getAllContact = async(req, res) => {
    res.send('get all contact')
}

const getSingleContact = async(req, res) => {
    res.send('get single contact')
}

const deleteSingleContact = async(req, res) => {
    res.send('delete single contact')
}

const deleteAllContact = async(req, res) => {
    res.send('delete all contact')
}

const updateContact = async(req, res) => {
    res.send('update contact')
}

module.exports = {
    getAllContact,
    getSingleContact,
    deleteAllContact,
    deleteSingleContact,
    updateContact
}