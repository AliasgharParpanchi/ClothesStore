const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const {
    verifyToken,
    verifyTokenAndAuthorinzation,
    verifyTokenAndAdminAuthorinzation,
    verifyTokenAdmin
} = require('../middelware/verifyToken');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const uploadDir = path.join(__dirname, '/images');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, (Date.now() + file.originalname));
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('File is not an image'));
        }
    }
});


const uploadImages = upload.array('img', 5)

//CREATE
router.post('/add', verifyTokenAdmin, uploadImages, async (req, res) => {
    try {
        const imagesFolderPath = 'C:\\Users\\98939\\Desktop\\project univercity\\project\\api\\router\\images';
        const relativeImagePath = [];
        for (let i = 0; i < req.files.length; i++) {
            relativeImagePath.push('http://localhost:3000/router/images/' + path.relative(imagesFolderPath, req.files[i].path))
        }



        const nProduct = {
            ...req.body,
            img: relativeImagePath,
            stock: JSON.parse(req.body.stock)
        };
        const newProduct = new Product(nProduct);
        await newProduct.save();
        res.status(201).json();
    } catch (err) {
        res.status(500).json(err);
    }

});

const UpdatePhoto = async (req, res, next) => {
    try {
        const product = await Product.findById(req.body.id || req.params.productId)
        const photo = product.img
        const photoDelete = photo.filter(img => img != req.body.img);

        if ( photoDelete.length > 0) {
            const imgUrlDel = photoDelete.map((url) => {
                return 'C:\\Users\\98939\\Desktop\\project univercity\\project\\api\\router' + url.substring(url.indexOf('/images'))
            })
            imgUrlDel.map(imageUrl => {
                if (fs.existsSync(imageUrl)) {
                    fs.unlink(imageUrl, (err) => {
                        if (err) {
                            res.status(500).json(err);
                        }
                        console.log('File deleted successfully');
                        
                    });
                }
            });
        }
        next();
    } catch (err) {
        res.status(500).json(err);
    }
}

//UPDATE
router.put('/update', verifyTokenAdmin, uploadImages, UpdatePhoto, async (req, res) => {
    try {
        const imagesFolderPath = 'C:\\Users\\98939\\Desktop\\project univercity\\project\\api\\router\\images';
        const relativeImagePath = [];
        for (let i = 0; i < req.files.length; i++) {
            relativeImagePath.push('http://localhost:3000/router/images/' + path.relative(imagesFolderPath, req.files[i].path))
        }



        const nProduct = {
            ...req.body,
            img: relativeImagePath,
            stock: JSON.parse(req.body.stock)
        };
        const newProduct = new Product(nProduct);

        const updatedProduct = await Product.findByIdAndUpdate(
            req.body.id, {
            $set: newProduct
        },
            { new: true }
        );
        res.status(200).json();
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete('/delete/:productId', verifyTokenAdmin, UpdatePhoto, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.productId);
        res.status(200).json('محصول حذف شد');
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get Product 
router.get('/find/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get ALL Product
router.get('/', async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    const qColor = req.query.color;
    const qSize = req.query.size;
    try {
        let product;

        if (qNew) {
            product = await Product.find().sort({ createdAt: -1 }).limit(5);
        } else if (qCategory) {
            product = await Product.find({
                category: {
                    $in: [qCategory]
                }
            });
        } else if (qColor) {
            product = await Product.find({
                'stock.color': {
                    $in: [qColor]
                }
            });

        } else if (qSize) {
            product = await Product.find({
                'stock.size': {
                    $in: [qSize]
                }
            });
        } else {
            product = await Product.find();
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;