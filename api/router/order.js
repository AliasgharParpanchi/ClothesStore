const express = require('express');
const router = express.Router();
const Order = require('../model/order');
const Product = require('../model/product');
const users = require('../model/user');
const {
  verifyToken,
  verifyTokenAndAuthorinzation,
  verifyTokenAndAdminAuthorinzation,
  verifyTokenAdmin
} = require('../middelware/verifyToken');
const jmoment = require('jalali-moment');

//CREATE ORDER 
router.post('/add', verifyToken, async (req, res) => {

  const products = req.body.products;
  for (const product of products) {
    const p = await Product.findById(product.productId);
    if (!p) {
      return res.status(400).json('محصول وجود ندارد');
    }
    for (const variant of p.stock) {
      if (variant.id === product.stockId) {
        if (variant.quantity < product.quantity) {
          return res.status(400).json('محصول موجود نیست');
        } else {


          let quantity = variant.quantity - product.quantity


          await Product.updateOne({ _id: product.productId, "stock._id": variant._id },
            { $set: { "stock.$.quantity": quantity } });

        }
      }
    }
  }

  const newOrder = new Order(req.body);

  try {
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json(err);
  }

});

//UPDATE Order
router.put('/update', verifyTokenAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.body._id, {
      $set: req.body 
    },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete('/delete/:orderID', verifyTokenAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.orderID);
    res.status(200).json('سفارش حذف شد')
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get USER Order
router.get('/find/:userId', verifyTokenAdmin, async (req, res) => {
  try {
    const Orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(Orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL ORDER
router.get('/', verifyTokenAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const Orders = query
      ? await Order.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails"
          }
        },
        {
          $match: {
            "userDetails": { $exists: true }
          }
        },
        {
          $sort: { "Order.createdAt": -1 }
        },
        {
          $limit: 5
        }


      ])
      : await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: 'products.productId',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      {
        $lookup: {
          from: 'payments',
          localField: 'paymentId',
          foreignField: '_id',
          as: 'paymentInfo'
        }
      },
      {
        $lookup: {
          from: 'shoppinginfos',
          localField: 'shoppingInfoId',
          foreignField: '_id',
          as: 'shoppinginfoDetails'
        }
      },
      {
        $match: {
         "userDetails": { $exists: true },
         "paymentInfo": { $exists: true },
         "shoppinginfoDetails": { $exists: true },
        }
      },
      {
        $project: {
          userDetails: { $arrayElemAt: ['$userDetails', 0] },
          paymentInfo: { $arrayElemAt: ['$paymentInfo', 0] },
          shoppinginfoDetails: { $arrayElemAt: ['$shoppinginfoDetails', 0] },
          products: {
            $map: {
              input: '$products',
              as: 'product',
              in: {
                productInfo: {
                  $arrayElemAt: [{
                    $filter: {
                      input: '$productDetails',
                      cond: { $eq: ['$$this._id', '$$product.productId'] }
                    }
                  }, 0]
                },
                quantity: '$$product.quantity',
                stockId: '$$product.stockId'
              }
            }
          },
          totalPrice: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1
        }
      },
      {
        $addFields: {
          products: {
            $filter: {
              input: '$products',
              as: 'product',
              cond: { $ne: ['$$product.productInfo', null] }
            }
          }
        }
      },
       ]);
    res.status(200).json(Orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/income/", verifyTokenAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$totalPrice",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;