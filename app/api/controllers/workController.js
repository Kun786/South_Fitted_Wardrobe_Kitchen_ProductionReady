const RecentWorkImagesModel = require('../models/RecentWorkImagesModel')
const HeaderImagesModel = require('../models/HeaderImagesModel');
const MultipleImagesFromRecentWorkModel = require('../models/MultipleImagesForRecentWorkModel');
const fs = require('fs');

module.exports = {

    RecentWorkImages: async (req, res) => {
        try {
            let _ImageCategory = req.body.ImageCategory;
            let _ImageDetail = {
                ImageCategory: _ImageCategory,
                imageUrl: req.file.filename,
                imageName: req.file.originalname,
                imageMimeType: req.file.mimetype
            }
            let _Data = await RecentWorkImagesModel.find();

            if (_Data.length <= 0) {
                const _DocToSave = await new RecentWorkImagesModel(_ImageDetail);
                _DocToSave.save();
                res.json({
                    Message: `Image Added Successfully And The Member is ${_ImageCategory}`,
                    Data: true
                })
            } else {
                // If there is/are Documents are in the collection then Update It.
                let _MemberAlreadyExists = await RecentWorkImagesModel.find({ ImageCategory: _ImageCategory });
                if (_MemberAlreadyExists.length > 0) { //It mean we have focund the document with Heading Category
                    let Data = await RecentWorkImagesModel.findOneAndUpdate({ ImageCategory: _ImageCategory }, {
                        $set: {
                            ImageCategory: _ImageCategory,
                            imageUrl: req.file.filename,
                            imageName: req.file.originalname,
                            imageMimeType: req.file.mimetype
                        }
                    })
                    fs.unlinkSync(`./RecentWorkImages/${_MemberAlreadyExists[0].imageUrl}`);
                    res.json({
                        Message: `Image Updated Successfully And Member is ${_ImageCategory}`,
                        Data: true
                    })
                } else {
                    //If The We done FInd The _HeadingCategory There Then add a new document
                    const _DocToSave = await new RecentWorkImagesModel(_ImageDetail);
                    _DocToSave.save();
                    res.json({
                        Message: `New Image Added Successfully And Member is ${_ImageCategory}`,
                        Data: true
                    });
                }
            }

        } catch (error) {
            res.json({
                Message: `There is Some Error${error.message}`,
                Data: false
            })
        }
    },

    GetRecentWorkImages: async (req, res) => {
        let _Data = await RecentWorkImagesModel.find();
        try {
            res.json({
                Message: `Data Found Successfully`,
                Data: true,
                Result: _Data
            })
        } catch (error) {
            res.json({
                Message: `Data Not Found! Either The DataBAse Collection is Empty or ${error.message}`,
                Data: false,
                Result: _Data
            })
        }
    },

    HeaderImages: async (req, res) => {
        try {
            let _ImageCategory = req.body.ImageCategory;
            let _DocumentDetails = {
                Headings: req.body.Headings,
                Description: req.body.Description,
                ImageCategory: _ImageCategory,
                imageUrl: req.file.filename,
                imageName: req.file.originalname,
                imageMimeType: req.file.mimetype
            }
            let _Data = await HeaderImagesModel.find();

            if (_Data.length <= 0) {
                const _DocToSave = await new HeaderImagesModel(_DocumentDetails);
                _DocToSave.save();
                res.json({
                    Message: `${_ImageCategory} Header Image Saved Successfully`,
                    Data: true
                })
            } else {
                // If there is/are Documents are in the collection then Update It.
                let _HeaderAlreadyExists = await HeaderImagesModel.find({ ImageCategory: _ImageCategory });
                if (_HeaderAlreadyExists.length > 0) { //It mean we have focund the document with Heading Category
                    let Data = await HeaderImagesModel.findOneAndUpdate({ ImageCategory: _ImageCategory }, {
                        $set: {
                            Headings: req.body.Headings,
                            Description: req.body.Description,
                            ImageCategory: _ImageCategory,
                            imageUrl: req.file.filename,
                            imageName: req.file.originalname,
                            imageMimeType: req.file.mimetype
                        }
                    })
                    fs.unlinkSync(`./HeaderImages/${_HeaderAlreadyExists[0].imageUrl}`);
                    res.json({
                        Message: `${_ImageCategory} Header Image Updated Successfully`,
                        Data: true
                    })
                } else {
                    //If The We done FInd The _HeadingCategory There Then add a new document
                    const _DocToSave = await new HeaderImagesModel(_DocumentDetails);
                    _DocToSave.save();
                    res.json({
                        Message: `New ${_ImageCategory} Header Image Updated Successfully`,
                        Data: true
                    });
                }
            }

        } catch (error) {
            res.json({
                Message: `There is Some Error${error.message}`,
                Data: false
            })
        }
    },

    GetHeaderImage: async (req, res) => {
        let _Data = await HeaderImagesModel.find();
        try {
            res.json({
                Message: `Data Found Successfully`,
                Data: true,
                Result: _Data
            })
        } catch (error) {
            res.json({
                Message: `Data Not Found! Either The DataBAse Collection is Empty or ${error.message}`,
                Data: false,
                Result: _Data
            })
        }
    },

    RecentWorkMultipleImages: async (req, res) => {
        try {
            //If The Document already Exist. Just Update the Image Detaisl By pushing the New Images Details
            const docs = await MultipleImagesFromRecentWorkModel.findOne({ ImageCategory: req.body.ImageCategory });
            if (docs) {
                const ImageDetailsToSave = req.files.map(file => ({
                    imageName: file.originalname,
                    imageMimeType: file.mimetype,
                    imageUrl: `${req.body.ImageCategory}/${file.filename}`
                }))
                await MultipleImagesFromRecentWorkModel.updateOne({ ImageCategory: docs.ImageCategory }, { $push: { imgDetails: ImageDetailsToSave } });
                res.json({
                    Message: `${docs.ImageCategory} Images Updated Successfully`,
                    Data: true
                })
            }
            else {
                // If Document does not exist then add a new document
                const ImageDetailsToSave = req.files.map(file => ({
                    imageName: file.originalname,
                    imageMimeType: file.mimetype,
                    imageUrl: `${req.body.ImageCategory}/${file.filename}`
                }))
                const docToSave = new MultipleImagesFromRecentWorkModel({
                    ImageCategory: req.body.ImageCategory,
                    imgDetails: ImageDetailsToSave
                })
                await docToSave.save();
                res.json({
                    Message: `${req.body.ImageCategory} Images Added Successfully`,
                    _Data: true
                })
            }

        } catch (err) {
            req.files.map(PathOfFilesToRemove => {
                fs.unlinkSync('./RecentWorkMultipleImages' + `/${req.body.ImageCategory}/${PathOfFilesToRemove.filename}`);
            })
            fs.rmdirSync(`./RecentWorkMultipleImages/${req.body.ImageCategory}`);
            res.status(500).json({ Message: err.message });
            console.log(err)
        }
    },

    GetRecentWorkMultipleImages: async (req, res) => {
        let _Data = await MultipleImagesFromRecentWorkModel.find();
        try {
            res.json({
                Message: `Data Found Successfully`,
                Data: true,
                Result: _Data
            })
        } catch (error) {
            res.json({
                Message: `Data Not Found! Either The DataBAse Collection is Empty or ${error.message}`,
                Data: false,
                Result: _Data
            })
        }
    },

    DeleteSingleImageFromRecentWork: async (req, res) => {

        try {
            let _ImageCategory = req.body.ImageCategory;
            let _ImageUrl = req.body.ImageUrl;
            //First Find the Category where the image is residing
            let _Data = await MultipleImagesFromRecentWorkModel.updateOne({ImageCategory:_ImageCategory}, { $pull: { imgDetails: { imageUrl: _ImageUrl }, }, });
            if(_Data.nModified === 1){
                fs.unlinkSync(`./RecentWorkMultipleImages/${_ImageUrl}`);
            }
            res.json({
                Message: "Image Delete Successfully",
                Data:true
            })
        } catch (error) {
            res.json({
                Message: `Data Not Found! Either The DataBAse Collection is Empty or ${error.message}`,
                Data: false,
                Result: _Data
            })
        }
    }
}