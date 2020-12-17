const express = require('express');
const router = express.Router();

//IMPORTING MODEL
const Track = require('./Schemas/Tracks');

//PUT ROUTES INSIDE DIFFERENT PAGES AND USING MIDDLEWARE NOT TO WRITE /highlights EACH TIME


//SUBMITS A TRACK
router.post('/add', async (req,res) =>{
    const track = new Track({
        album: req.body.album,
        url: req.body.url
    });
    try{
    const savedTrack = await track.save();
    console.log(savedTrack);
    res.json(savedTrack);
    }catch(err){
        res.json({message: err});
        console.log(err);
    }
});
//GETS ALL THE TRACKS
router.get('/', async(req, res)=>{
    try{
        const track = await Track.find();
        res.json(track);
    }catch(err){
        res.json({message: err});
    }
    });

//DELETE A TRACK
router.delete('/delete/:id', async(req , res) => {
    const deletedTrack = await Track.findByIdAndRemove(req.params.id);
    res.json({message: deletedTrack});
  });

router.put('/update/:id' , async(req , res , next)=>{
    try{
       const newTrack = await Track.findOne({_id : req.params.id})
  
       if(req.body.album){
         newTrack.album = req.body.album;
       }
  
       if(req.body.url){
         newTrack.url = req.body.url;
       }
  
       await newTrack.save();
       res.json(newTrack)
   }catch{
       res.status(404);
       res.json({error : "Post doesn't exist!"})
   }
  });

module.exports = router;