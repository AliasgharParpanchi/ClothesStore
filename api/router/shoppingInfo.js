const express = require('express');
const router = express.Router();
const ShoppingInfo = require('../model/shoppingInfo');
const Order = require('../model/order');
const {
    verifyToken, 
    verifyTokenAndAuthorinzation, 
    verifyTokenAndAdminAuthorinzation, 
    verifyTokenAdmin
} = require('../middelware/verifyToken');


//CREATE SHOPPING INFO
router.post('/add/:orderId', verifyToken, async(req, res) => {
    const orderId = req.params.orderId;
    const newShoppingInfo = new ShoppingInfo(req.body);
       
    try{
        await Order.findByIdAndUpdate(orderId, { $set: { shoppingInfoId: newShoppingInfo._id } });
        await newShoppingInfo.save();

        res.status(201).json(newShoppingInfo);
    }catch(err){
        res.status(500).json(err);
    }
})

//UPDATE SHOPPING INFO 
router.put('/update/:id', verifyTokenAndAuthorinzation, async (req, res) => {
    try{
       const updatedShoppingInfo = await ShoppingInfo.findByIdAndUpdate(
            req.body.id, {
            $set: req.body
        },
          {new: true}
       );
       res.status(200).json(updatedShoppingInfo);
   }catch (err){
       res.status(500).json(err);
        }
});

//Get ORDER ShoppingInfo
router.get('/find/:id', verifyTokenAndAdminAuthorinzation, async (req, res) => {
    try{
        const ShoppingInfoS = await ShoppingInfo.findById(req.ShoppingInfo.id);
        res.status(200).json(ShoppingInfoS);
    }catch (err){
        res.status(500).json(err);
    }
});

//DELETE SHOPPING INFO 
router.delete('/delete/:id', verifyTokenAndAdminAuthorinzation, async (req, res) => {
    try{
        await ShoppingInfo.findByIdAndDelete(req.body.id);
        res.status(200).json('مشخصات حذف شد')
    }catch (err){
        res.status(500).json(err);
    }
});

module.exports = router;