const mongoose =  require('mongoose');
const  autoIncrement = require('mongoose-auto-increment');

const testimoniesSchema =  mongoose.Schema({
    testimonies : {type : String , required : true},
    testimoniesBy : {type : String , required : true}
}).set('toObject' ,  { getters: true });

autoIncrement.initialize(mongoose.connection);

testimoniesSchema.plugin(autoIncrement.plugin , "Testimonies");

module.exports = mongoose.model("Testimonies" , testimoniesSchema);