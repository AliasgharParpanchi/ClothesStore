const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    description: String,
    category: [{type: String, required: true}],
    img: [String],
    stock: [
        {
            color: {type: String, required: true},
            size: {type: String, required: true},
            quantity: {type: Number, required: true, default : 1}
        }
        ],
    price: {type: Number, required: true},
    Active : {type: Boolean, default: true}
  },
  {timestamps: true}
);


module.exports = mongoose.model('Product', ProductSchema);