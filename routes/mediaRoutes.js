const express = require('express');
const Router = express.Router();
const multer = require('multer');
const fs = require('fs');
const crypto = require('crypto');

const workController = require("../app/api/controllers/workController");


//Block Start For Hashing the ImageUrl
const hashFunc = (fileName) => {
    const hash = crypto.createHash('md5');
    hash.update(fileName);
    const md5sum = hash.digest('hex');
    return md5sum;
};
//Block Ends For Hashing the ImageUrl


// Start Block Posting Multiple Images with subFolder


let uploadRecentWork = multer({
    storage: multer.diskStorage({
      destination: (req, next, cb) => {
        // let path = `./ProductCategoryImages/${req.body.FolderName}`;
        let path = `./RecentWorkImages`;
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path, function (err, res) {
            if (err) {
              res.json(err);
            }
            else {
              res.json('Saved Succefully');
            }
          });
        }
        cb(null, path);
      },
      filename: (req, file, cb) => {
        if(!file){
          res.json({
            Message:'You have not selected any file'
          })
        }
        else{
          const md5sum = hashFunc(file.originalname);
        //originalname is the uploaded file's name with date iso String
        let ext = file.mimetype.split('/')[1];
        // Fix svg+xml bug
        if (ext.includes('svg')) {
          ext = 'svg';
        }
  
        cb(null, `${Date.now()}_${md5sum}.${ext}`);
        }
        
      }
    })
  });


  let uploadHeaderImages = multer({
    storage: multer.diskStorage({
      destination: (req, next, cb) => {
        // let path = `./ProductCategoryImages/${req.body.FolderName}`;
        let path = `./HeaderImages`;
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path, function (err, res) {
            if (err) {
              res.json(err);
            }
            else {
              res.json('Saved Succefully');
            }
          });
        }
        cb(null, path);
      },
      filename: (req, file, cb) => {
        if(!file){
          res.json({
            Message:'You have not selected any file'
          })
        }
        else{
          const md5sum = hashFunc(file.originalname);
        //originalname is the uploaded file's name with date iso String
        let ext = file.mimetype.split('/')[1];
        // Fix svg+xml bug
        if (ext.includes('svg')) {
          ext = 'svg';
        }
  
        cb(null, `${Date.now()}_${md5sum}.${ext}`);
        }
        
      }
    })
  });


  let uploadRecentWorkMultipleImages = multer({
    storage: multer.diskStorage({
        destination: (req, next, cb) => {
            let path = `./RecentWorkMultipleImages/${req.body.ImageCategory}`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, function (err,res) {
                    if (err) {
                        res.json(err);
                     }
                     else{
                         res.json('Saved Succefully');
                     }
                });
            }
            cb(null, path);
        },
        filename: (req, file, cb) => {
            const md5sum = hashFunc(file.originalname);
      //originalname is the uploaded file's name with date iso String
      let ext = file.mimetype.split('/')[1];
      // Fix svg+xml bug
      if (ext.includes('svg')) {
        ext = 'svg';
      }

      cb(null, `${Date.now()}_${md5sum}.${ext}`);
        }
    })
});


Router.post('/addRecentWork',uploadRecentWork.single('ImageUrl'), workController.RecentWorkImages);
Router.get('/addRecentWork',workController.GetRecentWorkImages);
Router.post('/addHeaderImage',uploadHeaderImages.single('HeaderImage'),workController.HeaderImages);
Router.get('/addHeaderImage',workController.GetHeaderImage);
Router.post('/addRecentWorkMulitpleImages',uploadRecentWorkMultipleImages.array('MultipleImages',20),workController.RecentWorkMultipleImages);
Router.get('/addRecentWorkMulitpleImages',workController.GetRecentWorkMultipleImages);
Router.post('/deleteRecentWorkSingleImage',workController.DeleteSingleImageFromRecentWork);
module.exports = Router;