const express = require('express');
const cartItem = require('../model/cartItem');
const router = express.Router();
const {
    verifyToken,
    verifyTokenAndAuthorinzation,
    verifyTokenAndAdminAuthorinzation,
    verifyTokenAdmin
} = require('../middelware/verifyToken');


//CREATE cart 
router.post('/add', verifyToken, async (req, res) => {
    const newCartItem = new cartItem(req.body);

    try {
        const savedCart = await newCartItem.save();
        res.status(201).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }

});

//UPDATE cart
// router.put('/update/:id', verifyToken, async (req, res) => {
//     try {
//         const updatedcareItem = await cartItem.findByIdAndUpdate(
//             req.params.id, {
//             $set: req.body
//         },
//             { new: true }
//         );
//         res.status(200).json(updatedcareItem);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

//DELETE
router.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        await cartItem.deleteMany({userId: req.params.id});
        res.status(200).json('محصول حذف شد');
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get USER CART
router.get('/find/:userId', verifyToken, async (req, res) => {
    try {

        const CartITemFinal = await cartItem.aggregate([
            { $unwind: "$product" },
            {
              $lookup: {
                from: "products",
                localField: "product.productId",
                foreignField: "_id",
                as: "productDetails"
              }
            },
            { $unwind: "$productDetails" },
            {
              $addFields: {
                "selectedStock": {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$productDetails.stock",
                        as: "item",
                        cond: { $eq: ["$$item._id", "$product.stockId"] }
                      }
                    },
                    0
                  ]
                }
              }
            },
            {
              $group: {
                _id: "$userId",
                products: {
                  $push: {
                    Active: true,
                    _id: "$productDetails._id",
                    name: "$productDetails.name",
                    description: "$productDetails.description",
                    category: "$productDetails.category",
                    img: "$productDetails.img",
                    stock: "$productDetails.stock",
                    price: "$productDetails.price",
                    createdAt: "$productDetails.createdAt",
                    __v: "$productDetails.__v",
                    color: "$selectedStock.color",
                    size: "$selectedStock.size",
                    quantity: "$product.quantity"
                  }
                },
                totalQuantity: { $sum: "$product.quantity" },
                totalPrice: { $sum: { $multiply: ["$product.quantity", "$productDetails.price"] } }
              }
            },
            {
              $project: {
                _id: 0,
                userId: "$_id",

                  products: "$products",
                  quantity: "$totalQuantity",
                  total: "$totalPrice"

              }
            }
        ])
        const CartItem = CartITemFinal.filter(x => x.userId = req.params.userId);
        res.status(200).json(CartItem);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;