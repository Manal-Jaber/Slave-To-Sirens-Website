const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv/config');
const app=express();

//MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
mongoose.set('useFindAndModify', false);

/**--------------------News Start-------------------------- */
app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static('uploads'));

const { diskStorage } = require('multer');
//To be able to parse multi-form data like files, images,..
const multer = require('multer');

//Routes
const tracksRoute = require('./tracks');
app.use('/admin/tracks', tracksRoute);

const albumsRoute = require('./albums');
app.use('/admin/albums', albumsRoute);

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

const News = require('./Schemas/NewsSchema');

app.post('/admin/news/insert',upload.single('Image'), async (req, res, next)=>{
  console.log(req);
    const image = new News({
        link : req.body.link,
        caption :req.body.caption,
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


app.get('/admin/news/read', async (req, res)=>{
    try{
        const images = await News.find();
        res.json(images);
    }catch(err){
        res.json({message: err});
    }
    });

app.delete('/admin/news/delete/:id' , async(req, res) => {
  const id = req.params.id;
  await News.findByIdAndRemove(id).exec();
  res.json('deleted');
})

/**---------------------------------News End------------------------------- */

/**-------------------------------Gallery Start------------------------------*/

/**--------------------------Gallery Carousel Start--------------------------*/


const GalleryCarousel =  require("./Schemas/GalleryCarouselSchema");


app.post('/admin/galleryCarousel/insert',upload.single('Image'), async (req, res, next)=>{
  console.log(req);
    const imageCarousel = new GalleryCarousel({
        image: req.file.path
    });
    try{
        const savedImage = await imageCarousel.save();
        console.log(savedImage);
        res.json(savedImage);
    }catch(err){
        res.json({message: err});
        console.log(err);
        }
});


app.get('/admin/galleryCarousel/read' ,async(req , res , next) => {
  GalleryCarousel.find({} , (err , result) => {
    if(err){
      res.json(err);
    }else{
    res.json(result);
    }
  }).exec();
});

app.delete('/admin/galleryCarousel/delete/:id' , async(req, res) => {
  const id = req.params.id;
  await GalleryCarousel.findByIdAndRemove(id).exec();
  res.json('deleted');
})



/**--------------------------Gallery Carousel End----------------------------*/

/**--------------------------Gallery Photos Under Carousel Start---------------------------*/

const Gallery = require("./Schemas/GallerySchema");

app.post('/admin/gallery/insert',upload.single('Image'), async (req, res, next)=>{
  console.log(req);
    const imageGallery = new Gallery({
        image: req.file.path
    });
    try{
        const savedImage = await imageGallery.save();
        console.log(savedImage);
        res.json(savedImage);
    }catch(err){
        res.json({message: err});
        console.log(err);
        }
});


app.get('/admin/gallery/read' ,async(req , res , next) => {
  Gallery.find({} , (err , result) => {
    if(err){
      res.json(err);
    }else{
    res.json(result);
    }
  }).exec();
});

app.delete('/admin/gallery/delete/:id' , async(req, res) => {
  const id = req.params.id;
  await Gallery.findByIdAndRemove(id).exec();
  res.json('deleted');
})



/**--------------------------Gallery Photos Under Carousel End---------------------------*/



/**-------------------------------Gallery End--------------------------------*/



/**-------------------------------Events Start-------------------------------*/

/**-------------------------------Events Images Start------------------------------*/

const EventsImages = require("./Schemas/EventsImagesSchema");

app.post('/admin/events/image/insert',upload.single('Image'), async (req, res, next)=>{
  console.log(req);
    const imageEvents = new EventsImages({
        image: req.file.path
    });
    try{
        const savedImage = await imageEvents.save();
        console.log(savedImage);
        res.json(savedImage);
    }catch(err){
        res.json({message: err});
        console.log(err);
        }
});

app.get('/admin/events/image/read' ,async(req , res , next) => {
  EventsImages.find({} , (err , result) => {
    if(err){
      res.json(err);
    }else{
    res.json(result);
    }
  }).exec();
});

app.put('/admin/events/image/update/:id' , upload.single('Image'), async(req , res , next)=>{
  try{
     const newEventsImage= await EventsImages.findOne({_id : req.params.id})

     if(req.file.path){
      newEventsImage.image = req.file.path;
     }
     await newEventsImage.save();
     res.json(newEventsImage)
 }catch{
     res.status(404);
     return res.json({error : "Post doesn't exist!"})

 }
});






/**-------------------------------Events Images End---------------------------*/

/**-------------------------------Highlights Start----------------------------*/

const Highlights =  require("./Schemas/HighlightsSchema");

app.post('/admin/highlights/insert' , async(req , res , next) => {
  console.log(req)
  const text = req.body.text;
  const date = req.body.date;
  const url = req.body.url;
  const country = req.body.country;
  
  const newHiglights = new Highlights({
    text : text,
    date : date,
    url : url,
    country : country
  });
  try{
    const result = await newHiglights.save();
    res.json(result);
  }catch(err){
    console.log(err)
  }
});

app.get('/admin/highlights/read' , (req , res ,next) => {
  Highlights.find({} , (err , result) => {
    if(err){
      res.json(err);
    }else{
    res.json(result);
    }
  }).exec();
});


app.delete('/admin/highlights/delete/:id' , async(req , res , next) => {
  const id = req.params.id;
  await Highlights.findByIdAndRemove(id).exec();
  res.json('deleted');
});


app.put('/admin/highlights/update/:id' , async(req , res , next)=>{
  try{
     const newHiglights = await Highlights.findOne({_id : req.params.id})
     if(req.body.text){
         newHiglights.text = req.body.text;
     }
     if(req.body.date){
         newHiglights.date = req.body.date;
     }
     if(req.body.url){
       newHiglights.url= req.body.url;
     }
     if(req.body.country){
       newHiglights.country = req.body.country; 
     }

     await newHiglights.save();
     res.json(newHiglights)
 }catch{
     res.status(404);
     return res.json({error : "Post doesn't exist!"})
 }
});






/**-------------------------------Highlights End-------------------------------*/



/**-------------------------------Upcoming Shows Start---------------------------*/


const UpComing = require("./Schemas/UpcomingSchema");


app.post('/admin/upcoming/insert' , async(req , res , next) => {
  console.log(req)
  const text = req.body.text;
  const date = req.body.date;
  const url = req.body.url;
  const country = req.body.country;
  
  const newUpcoming = new UpComing({
    text : text,
    date : date,
    url : url,
    country : country
  });
  try{
    const result = await newUpcoming.save();
    res.json(result);
  }catch(err){
    console.log(err)
  }
});

app.get('/admin/upcoming/read' , (req , res ,next) => {
  UpComing.find({} , (err , result) => {
    if(err){
      res.json(err);
    }else{
    res.json(result);
    }
  }).exec();
});


app.delete('/admin/upcoming/delete/:id' , async(req , res , next) => {
  const id = req.params.id;
  await UpComing.findByIdAndRemove(id).exec();
  res.json('deleted');
});


app.put('/admin/upcoming/update/:id' , async(req , res , next)=>{
  try{
     const newUpcoming = await UpComing.findOne({_id : req.params.id})
     if(req.body.text){
         newUpcoming.text = req.body.text;
     }
     if(req.body.date){
      newUpcoming.date = req.body.date;
     }
     if(req.body.url){
      newUpcoming.url= req.body.url;
     }
     if(req.body.country){
      newUpcoming.country = req.body.country; 
     }

     await newUpcoming.save();
     res.json(newUpcoming)
 }catch{
     res.status(404);
     return res.json({error : "Post doesn't exist!"})
 }
});



/**-------------------------------Upcoming Shows Start---------------------------*/

/**-------------------------------Events End---------------------------------*/




/**------------------------Reviews Start------------------------*/

const Reviews = require("./Schemas/ReviewsSchema");

app.post('/admin/reviews/insert' , async(req , res , next) => {

    const text = req.body.text;
    const link = req.body.link;
    const caption= req.body.name;

    const newReviews = new Reviews({
      text : text,
      link : link,
      caption: caption
    });
  try{
    const result = await newReviews.save();
    res.json(result);
  }catch(err){
    console.log(err)
  }

  });


  app.get('/admin/reviews/read' ,async(req , res , next) => {
    Reviews.find({} , (err , result) => {
      if(err){
        res.json(err);
      }else{
      res.json(result);
      }
    }).exec();
  });

  app.delete('/admin/reviews/delete/:id' , async(req , res , next) => {
    const id = req.params.id;
    await Reviews.findByIdAndRemove(id).exec();
    res.json('deleted');
  });

  app.put('/admin/reviews/update/:id' , async(req , res , next)=>{
       try{
          const newReviews = await Reviews.findOne({_id : req.params.id})
          if(req.body.text){
              newReviews.text = req.body.text;
          }
          if(req.body.link){
              newReviews.link = req.body.link;
          }
          if(req.body.name){
            newReviews.caption= req.body.name;
          }

          await newReviews.save();
          res.json(newReviews)
      }catch{
          res.status(404);
          return res.json({error : "Post doesn't exist!"})

      }
  });

/**------------------------Reviews End------------------------*/

/**------------------------Testimonies Start------------------------*/
const Testimonies = require("./Schemas/TestimoniesSchema");

app.post('/admin/testimonies/insert' , async(req , res , next) => {

    const testimonies  = req.body.testimonies;
    const testimoniesBy  = req.body.testimoniesBy;

    const newTestimonies = new Testimonies({
       testimonies : testimonies,
       testimoniesBy : testimoniesBy
    });
  try{
    const result = await newTestimonies.save();
    res.json(result);
  }catch(err){
    console.log(err)
  }

  });


  app.get('/admin/testimonies/read' ,async(req , res , next) => {
    Testimonies.find({} , (err , result) => {
      if(err){
        res.json(err);
      }
      res.json(result);
    }).exec();

  });

  app.delete('/admin/testimonies/delete/:id' , async(req , res , next) => {
    const id = req.params.id;
    await Testimonies.findByIdAndRemove(id).exec();
    res.json('deleted');
  });

  app.put('/admin/testimonies/update/:id' , async(req , res , next)=>{
    try{
       const newTestimonies = await Testimonies.findOne({_id : req.params.id})

       if(req.body.testimonies){
         newTestimonies.testimonies = req.body.testimonies;
       }

       if(req.body.testimoniesBy){
         newTestimonies.testimoniesBy = req.body.testimoniesBy;
       }

       await newTestimonies.save();
       res.json(newTestimonies)
   }catch{
       res.status(404);
       return res.json({error : "Post doesn't exist!"})

   }
  });



  /**------------------------Testimonies End------------------------*/







//ROUTES
app.get('/', (req, res)=>{
res.send('Home page');
console.log('fine')
});

//CONNECT TO DB
mongoose.connect('mongodb+srv://SlavesToSirens:codestellars123@slavetosirens.tvhne.mongodb.net/SlaveToSirens?retryWrites=true&w=majority' ,  {useNewUrlParser: true, useUnifiedTopology: true ,  useCreateIndex: true, useNewUrlParser: true}).then(
    () => {
        app.listen(3001);
    }).catch(
        () => {
            console.log(err)
        }
);

