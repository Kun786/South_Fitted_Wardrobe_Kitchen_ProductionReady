const mongoose = require('mongoose');


// Date
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

const CollectionSchema = mongoose.Schema({
    ImageCategory: { type: String, required: true, },
    imgDetails: [
        {
            _id: false,
            imageUrl: { type: String, },
            imageName: { type: String, },
            imageMimeType: { type: String, },
        }
    ],
    Date: {
        type: String,
        default: `${year}-${month}-${day}`,
    },
}, { timestamps: true, });




module.exports = mongoose.model('MultipleImagesFromRecentWork', CollectionSchema);
