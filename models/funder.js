const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const funderSchema = new Schema({
    name: String,
    email: String,
    repName: String,
    groupId: String
});

module.exports = mongoose.model('Funders', funderSchema, 'Funders');