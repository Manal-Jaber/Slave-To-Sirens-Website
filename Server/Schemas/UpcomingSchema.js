const mongoose = require('mongoose');
const  autoIncrement = require('mongoose-auto-increment');

const UpcomingSchema = mongoose.Schema({
   text : {
        type : String,
        required : true    
   },
   date : {
       type : String,
       required : true 
    },
    url : {
        type : String,
        default : "#"
    },
    country : {
        type : String,
        required : true 
    }
}).set('toObject' ,  { getters: true });

autoIncrement.initialize(mongoose.connection);
UpcomingSchema.plugin(autoIncrement.plugin, 'Upcoming');
module.exports = mongoose.model('Upcoming', UpcomingSchema);