const express = require('express');
const router = express.Router();
const User = require('../model/user');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { verifyToken, verifyTokenAndAuthorinzation } = require('../middelware/verifyToken');

//UPDATE
router.put('/:id', verifyToken, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SECRET_KEY)
            .toString();
        };
        
        try {
            const user = await User.findOne({ userName: req.body.userName })

        if (user && user._id != req.params.id) {
           res.status(401).json('نام کاربری تکراری است');
        } else {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, {
                $set: req.body
            },
                { new: true }
            );
            const accesToken = jwt.sign({
                id: updatedUser._id
            },
                process.env.JWT_SECRET,
                { expiresIn: "3d" }
            );
            const { password, ...other } = updatedUser._doc;
            res.status(200).json({ ...other, accesToken });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


//DELETE
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('کاربر حذف شد');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;