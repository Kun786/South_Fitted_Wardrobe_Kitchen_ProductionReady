const express = require('express');
const router = express.Router();

const messageController = require('../app/api/controllers/contactMessagesController');

router.post('/addMessage', messageController.addMessage);
router.get('/getMessage', messageController.getAllMessages);
router.post('/SendEmail', messageController.SendEmail);

module.exports = router;