const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");
const userrouter = require('./router/user');
const auth = require('./router/auth');
const adminrouter = require('./router/admin');
const productrouter = require('./router/product');
const orderrouter = require('./router/order');
const shoppingInforouter = require('./router/shoppingInfo');
const paymentrouter = require('./router/payment');
const cartItemrouter = require('./router/cartItem');
const path = require('path');



dotenv.config();
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log('Couldn\'t connect to MongoDB: ' + error));

app.use(express.json({ limit: '50mb' }));
app.use('/router/images', express.static(path.join(__dirname, '/router/images')));
app.use('/router/users', userrouter);
app.use('/router/users', auth);
app.use('/router/admin', adminrouter);
app.use('/router/products',productrouter);
app.use('/router/orders', orderrouter);
app.use('/router/shoppingInfo', shoppingInforouter);
app.use('/router/payment', paymentrouter);
app.use('/router/cartItem', cartItemrouter); 

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
});