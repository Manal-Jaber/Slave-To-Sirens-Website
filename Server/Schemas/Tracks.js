const mongoose = require('mongoose');
const  autoIncrement = require('mongoose-auto-increment');

const TracksSchema = mongoose.Schema({
    album: {
        type: String,
        required: true
    },
    url: {
        type: String,
        default: "#"
    }
}).set('toObject' ,  { getters: true });

autoIncrement.initialize(mongoose.connection);
TracksSchema.plugin(autoIncrement.plugin, 'Tracks');
module.exports = mongoose.model('Tracks', TracksSchema);