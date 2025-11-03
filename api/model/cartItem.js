const mongoose = require('mongoose');


const CartItemSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    product: [
        {
            productId: { type: mongoose.Types.ObjectId, required: true},
            stockId: { type: mongoose.Types.ObjectId, required: true},
            quantity: { type: 'number', default: 1}
        }
    ]
});


module.exports = mongoose.model('CartItem', CartItemSchema);