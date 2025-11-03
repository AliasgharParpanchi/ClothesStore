const mongoose = require('mongoose');


const PaymentSchema = new mongoose.Schema({
    cardNumber: {type: String, required: true},
    price: {type: Number, default: 0},
    status: {type: String, default: 'unpaid'}
},
{timestamps: true}
);



module.exports = mongoose.model('Payment', PaymentSchema);