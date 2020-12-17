const mongoose =  require ('mongoose');
const  autoIncrement = require('mongoose-auto-increment');

const galleryCarouselSchema = mongoose.Schema({
    image : {type : String , required : true} 
}).set('toObject' ,  { getters: true });

autoIncrement.initialize(mongoose.connection);

galleryCarouselSchema.plugin(autoIncrement.plugin , 'GalleryCarousel');

module.exports = mongoose.model('GalleryCarousel' , galleryCarouselSchema);