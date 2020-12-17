const mongoose =  require ('mongoose');
const  autoIncrement = require('mongoose-auto-increment');

const eventsSchema = mongoose.Schema({
    image : {type : String , required : true} 
}).set('toObject' ,  { getters: true });

autoIncrement.initialize(mongoose.connection);

eventsSchema.plugin(autoIncrement.plugin , 'EventsImage');

module.exports = mongoose.model('EventsImage' , eventsSchema);