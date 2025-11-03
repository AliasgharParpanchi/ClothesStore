const jwt = require('jsonwebtoken');
const { builtinModules } = require('module');
const admin = require('../model/admin');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                res.status(403).json('توکن منقضی شده است');

            } else {
                req.user = user;
                next();
            }
        });
    } else {
        return res.status(401).json('باید وارد شوید');
    }
};

const verifyTokenAdmin = (req, res, next) => {
    const authHeader = req.headers.token;

    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, admin) => {
            if (err) {
                res.status(403).json('توکن منقضی شده است');
            } else {
                req.admin = admin;
                next();
            }
        });

    } else {
        return res.status(401).json('باید وارد شوید');
    }
};
const verifyTokenAndAuthorinzation = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id) {
            next();

        } else {
            res.status(403).json('شما مجاز نیستید')
        };
    });
};
const verifyTokenAndAdminAuthorinzation = (req, res, next) => {

    verifyTokenAdmin(req, res, () => {
        if (req.admin._id == req.params.id) {
            next();
        } else {
            res.status(403).json('شما مجاز نیستید');

        };
    });
};
module.exports = { verifyToken, verifyTokenAndAuthorinzation, verifyTokenAndAdminAuthorinzation, verifyTokenAdmin }