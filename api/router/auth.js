const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const User = require('../model/user');



//Register
router.post('/register', async (req, res) => {
    if (await User.findOne({ userName: req.body.userName })) {
        res.status(401).json('نام کاربری تکراری است');
    } else {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            userName: req.body.userName,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET_KEY).toString()
        });

        try {
            const savedUser = await newUser.save();
            const accesToken = jwt.sign({
                id: savedUser._id
            },
                process.env.JWT_SECRET,
                { expiresIn: "3d" }
            );
            const { password, ...other } = savedUser._doc;
            res.status(201).json({ ...other, accesToken });
        } catch (err) {
            res.status(500).json(err);
        }
    }
});

//Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.body.userName });
        !user && res.status(401).json('کاربر یافت نشد');

        if (user) {

            const decryptPassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.PASS_SECRET_KEY);
            const orginalPassword = decryptPassword.toString(CryptoJS.enc.Utf8);

            orginalPassword != req.body.password && res.status(401).json('رمز عبور صحیح نیست');
            if (orginalPassword == req.body.password) {

                const accesToken = jwt.sign({
                    id: user._id
                },
                    process.env.JWT_SECRET,
                    { expiresIn: "3d" }
                );
                const { password, ...other } = user._doc;
                res.status(200).json({ ...other, accesToken });
            }
        }

    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;