const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    Headings: { type: String, },
    Description: { type: String, },
    ImageCategory: { type: String, },
    imageUrl: { type: String, },
    imageName: { type: String, },
    imageMimeType: { type: String, },
});




module.exports = mongoose.model('HeaderImagesCollection', Schema);