const mongoose = require('mongoose');
const Product = require('./product');
const {convertToJalali} = require('../middelware/ConvertDate');


const OrderSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    products: [
        {
            productId: { type: mongoose.Types.ObjectId, required: true},
            stockId: { type: mongoose.Types.ObjectId, required: true},
            quantity: { type: Number, default: 1}
        }
    ],
    totalPrice : {type: Number},
    shoppingInfoId: {type: mongoose.Schema.Types.ObjectId,
        ref: 'ShoppingInfo',}, 
    paymentId: {type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',},
    status: {type: String, required: true, default: 'پرداخت نشده'},
},
{timestamps: true}
); 

OrderSchema.pre('save', async function(next) {
    var total = 0;
    
    for (const product of this.products) {
        let model = await Product.findById(product.productId);
        let price = model.price;
        total += product.quantity * price;
    }
    this.totalPrice = total;
    next();
  });

  OrderSchema.virtual('createdAtJalali').get(function() {
    return convertToJalali(this.createdAt);
  });
  OrderSchema.set('toObject', { virtuals: true });
  OrderSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Order', OrderSchema);