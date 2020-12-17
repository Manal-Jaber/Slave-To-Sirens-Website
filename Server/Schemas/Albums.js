const mongoose = require('mongoose');
const  autoIncrement = require('mongoose-auto-increment');

const AlbumsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}).set('toObject' ,  { getters: true });

autoIncrement.initialize(mongoose.connection);
AlbumsSchema.plugin(autoIncrement.plugin, 'Albums');
module.exports = mongoose.model('Albums', AlbumsSchema);