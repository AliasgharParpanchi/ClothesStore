const express = require('express');
const router = express.Router();
const Payment = require('../model/payment');
const Order = require('../model/order');
const {
    verifyToken, 
    verifyTokenAndAuthorinzation, 
    verifyTokenAndAdminAuthorinzation, 
    verifyTokenAdmin
} = require('../middelware/verifyToken');

//CREATE PAYMENT
router.post('/add/:orderId', verifyToken, async(req, res) => {
    const orderId = req.params.orderId;
    const newPayment = new Payment(req.body);
    try{
        const price = await Order.findByIdAndUpdate(orderId, 
            { $set: { paymentId: newPayment._id,
                status: 'پرداخت شده'
             } });

        newPayment.price = price.totalPrice;
        await newPayment.save();

        res.status(201).json(newPayment);
    }catch(err){
        res.status(500).json(err);
    }
});

//UPDATE PAYMENT
router.put('/update/:id', verifyTokenAndAuthorinzation, async (req, res) => {
    try{
       const updatedPayment = await Payment.findByIdAndUpdate(
            req.body.id, {
            $set: req.body
        },
          {new: true}
       );
       res.status(200).json(updatedPayment);
   }catch (err){
       res.status(500).json(err);
        }
});

//Get ORDER Payment
router.get('/find/:id', verifyTokenAndAdminAuthorinzation, async (req, res) => {
    try{
        const PaymentS = await Payment.findById(req.Payment.id);
        res.status(200).json(PaymentS);
    }catch (err){
        res.status(500).json(err);
    }
});

//DELETE Payments
router.delete('/delete/:id', verifyTokenAndAdminAuthorinzation, async (req, res) => {
    try{
        await Payment.findByIdAndDelete(req.body.id);
        res.status(200).json('پرداخت حذف شد')
    }catch (err){
        res.status(500).json(err);
    }
});

module.exports = router;