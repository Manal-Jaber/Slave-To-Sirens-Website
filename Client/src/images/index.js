const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv/config');
const app=express();

//MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static('uploads'));

/*app.use('/posts', ()=>{
    console.log("Middle ware running")
});
//to autherize user before route
app.use('auth');  no need for this
app.get('/',auth, (req, res)=>{ use this instead 
    auth is a function with 3 params req, res, next
*/

//IMPORT ROUTES
const highlightsRoute = require('./routes/highlights');
app.use('/highlights', highlightsRoute);

const upcomingRoute = require('./routes/upcoming');
app.use('/upcoming', upcomingRoute);

const imagesRoute = require('./routes/images');
app.use('/images', imagesRoute);


//ROUTES
app.get('/', (req, res)=>{
res.send('Home page');
console.log('fine')
});

//CONNECT TO DB
mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    { useUnifiedTopology: true },
    ()=> console.log('connected to DB')
);

//LISTEN TO PORT
app.listen(3001, ()=>
console.log('Listening to port 3001'));