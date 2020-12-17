const mongoose = require('mongoose');
const  autoIncrement = require('mongoose-auto-increment');

const HighlightsSchema = mongoose.Schema({
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
HighlightsSchema.plugin(autoIncrement.plugin, 'Highlights');
module.exports = mongoose.model('Highlights', HighlightsSchema);