const express = require('express');
const router = express.Router();

//IMPORTING MODEL
const Album = require('./Schemas/Albums');

//PUT ROUTES INSIDE DIFFERENT PAGES AND USING MIDDLEWARE NOT TO WRITE /highlights EACH TIME


//SUBMITS AN ALBUM
router.post('/add', async (req,res) =>{
    console.log(req)
    const album = new Album({
        name: req.body.name
    });
    try{
    const savedAlbum = await album.save();
    console.log(savedAlbum);
    res.json(savedAlbum);
    }catch(err){
        res.json({message: err});
        console.log(err);
    }
});
//GETS ALL THE Albums
router.get('/', async(req, res)=>{
    try{
        const album = await Album.find();
        res.json(album);
    }catch(err){
        res.json({message: err});
    }
    });

//DELETE AN ALBUM
router.delete('/delete/:id', async(req , res) => {
    const deletedAlbum = await Album.findByIdAndRemove(req.params.id);
    res.json({message: deletedAlbum});
  });

router.put('/update/:id' , async(req , res , next)=>{
    try{
       const newAlbum = await Album.findOne({_id : req.params.id})
  
         newAlbum.name = req.body.name;
  
       await newAlbum.save();
       res.json(newAlbum)
   }catch{
       res.status(404);
       res.json({error : "Post doesn't exist!"})
   }
  });

module.exports = router;