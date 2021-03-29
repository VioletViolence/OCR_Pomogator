const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dealSchema = new Schema({
    userName: String,
    stage: String
});

module.exports = mongoose.model('Deals', dealSchema, 'Deals');