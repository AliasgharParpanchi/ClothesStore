const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        unique: true,
        default: 'admin'
    },
    password: {
        type: String,
        required: true,
        default: 'admin'
    }
});


module.exports = mongoose.model('Admin', AdminSchema);