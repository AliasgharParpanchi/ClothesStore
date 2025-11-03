const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const Admin = require('../model/admin');
const { verifyTokenAdmin, verifyTokenAndAdminAuthorinzation } = require('../middelware/verifyToken');
const jmoment = require('jalali-moment');


//Get user
router.get('/find/:id', verifyTokenAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.body.id);
        const other = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get ALL user
router.get('/findAll', verifyTokenAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query
            ? await User.find().sort({ _id: -1 }).limit(5)
            : await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Login
router.post('/login', async (req, res) => {
    try {
        const admin = await Admin.findOne({ userName: req.body.userName });
        !admin && res.status(401).json('مدیر یافت نشد');

        if (admin) {

            const decryptPassword = CryptoJS.AES.decrypt(
                admin.password,
                process.env.PASS_SECRET_KEY);
            const orginalPassword = decryptPassword.toString(CryptoJS.enc.Utf8);

            orginalPassword != req.body.password && res.status(401).json('رمز عبور اشتباه است');
            if (orginalPassword == req.body.password) { 

                const accesToken = jwt.sign({
                    id: admin._id
                },
                    process.env.JWT_SECRET,
                    { expiresIn: "3d" }
                );

                const { password, ...other } = admin._doc;
    
                res.status(200).json({ ...other, accesToken });
            }
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

//Update
router.put('/update/:id', verifyTokenAdmin, async(req, res) => {
    try{
        const updateAdmin = await Admin.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    userName: req.body.userName,
                    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET_KEY).toString()
                }
            }
        )
        if (!updateAdmin) {
            return res.status(401).json({ message: "کاربر یافت نشد" });
        }
        res.status(200).json(updateAdmin)

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/stats", verifyTokenAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $addFields: {
                    jalaliDate: {
                        $let: {
                            vars: {
                                miladi: { $toDate: "$createdAt" },
                            },
                            in: {
                                $dateFromParts: {
                                    year: { $year: "$$miladi" },
                                    month: { $month: "$$miladi" },
                                    day: { $dayOfMonth: "$$miladi" },
                                },
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    month: { $month: "$jalaliDate" },
                    jalaliMonth: { $toString: jmoment("$jalaliDate", "jYYYY/jM/jD").format("jM") },
                },
            },
            {
                $group: {
                    _id: "$jalaliMonth",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;