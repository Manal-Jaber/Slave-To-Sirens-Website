const express = require('express');
const { diskStorage } = require('multer');
const router = express.Router();
//To be able to parse multi-form data like files, images,..
const multer = require('multer');

//destination to be uploaded to
//const upload = multer({dest: 'uploads/'});

//To identify storing method of image
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, './uploads/');
    },
    filename: (req, file, cb)=> {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

//To pass to multer
const upload = multer({storage: storage});

//IMPORTING MODEL
const Image = require('../models/Image');

router.post('/add', upload.single('Image'), async (req, res, next)=>{
    const image = new Image({
        name: req.file.originalname,
        alt: req.body.alt,
        route: req.file.path
    });
    try{
        const savedImage = await image.save();
        console.log(savedImage);
        res.json(savedImage);
    }catch(err){
        res.json({message: err});
        console.log(err);
        }

});


router.get('/', async (req, res)=>{
    try{
        const images = await Image.find();
        res.json(images);
    }catch(err){
        res.json({message: err});
    }
    });


module.exports = router;