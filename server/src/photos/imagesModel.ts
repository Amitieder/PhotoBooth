const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imagesSchema = new Schema({
    url: {
        type : String,
        required: true
    }
}, { timestamps: true });

const Images = mongoose.model('Images', imagesSchema);

module.exports = Images;