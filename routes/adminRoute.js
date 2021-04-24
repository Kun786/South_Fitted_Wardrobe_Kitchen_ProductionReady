const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const adminController = require('../app/api/controllers/adminController');

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    // ACCEPT OR REJECT A FILE
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4' || file.mimetype === 'audio/ogg'
        || file.mimetype === 'audio/mp3' || file.mimetype === 'audio/x-m4a' || file.mimetype === 'application/octet-stream'
        || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: fileStorage,
    limits: {
        fileSize: 1024 * 1024 * 1024 * 1
    },
    fileFilter: fileFilter
});

router.post('/addAdmin',upload.single('file'), adminController.addAdmin);
router.post('/loginAdmin', adminController.loginAdmin);
module.exports = router;