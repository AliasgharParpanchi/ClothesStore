const mongoose = require('mongoose');

const ShoppingInfoSchema = new mongoose.Schema({
    address: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zipCode: {type: Number, required: true}
});


module.exports = mongoose.model('ShoppingInfo', ShoppingInfoSchema);