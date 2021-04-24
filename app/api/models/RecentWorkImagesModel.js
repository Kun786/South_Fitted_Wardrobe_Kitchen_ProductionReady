const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    ImageCategory: { type: String, },
    imageUrl: { type: String, },
    imageName: { type: String, },
    imageMimeType: { type: String, },
});




module.exports = mongoose.model('HomeRecentWorkImagesCollection', Schema);