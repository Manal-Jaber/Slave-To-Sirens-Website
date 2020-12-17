const mongoose =  require ('mongoose');
const  autoIncrement = require('mongoose-auto-increment');

const reviewsSchema = mongoose.Schema({
    text : {type : String , required : true},
    link : {type: String , required : true},
    name : {type : String , required : true }
    
}).set('toObject' ,  { getters: true });

autoIncrement.initialize(mongoose.connection);

reviewsSchema.plugin(autoIncrement.plugin , 'Reviews');

module.exports = mongoose.model('Reviews' , reviewsSchema);