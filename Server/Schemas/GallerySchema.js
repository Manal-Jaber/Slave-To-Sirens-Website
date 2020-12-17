const mongoose =  require ('mongoose');
const  autoIncrement = require('mongoose-auto-increment');

const gallerySchema = mongoose.Schema({
    image : {type : String , required : true} 
}).set('toObject' ,  { getters: true });

autoIncrement.initialize(mongoose.connection);

gallerySchema.plugin(autoIncrement.plugin , 'Gallery');

module.exports = mongoose.model('Gallery' , gallerySchema);