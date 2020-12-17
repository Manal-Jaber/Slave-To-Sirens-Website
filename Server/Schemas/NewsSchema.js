const mongoose = require('mongoose');
const  autoIncrement = require('mongoose-auto-increment');

const NewsSchema = mongoose.Schema({
    link :{
        type :String,
        required : true
    },
    caption :{
        type: String,
        required : true
    },
    route: {
        type: String,
        required: true
    }
}).set('toObject' ,  { getters: true });

autoIncrement.initialize(mongoose.connection);
NewsSchema.plugin(autoIncrement.plugin, 'News');
module.exports = mongoose.model('News', NewsSchema);