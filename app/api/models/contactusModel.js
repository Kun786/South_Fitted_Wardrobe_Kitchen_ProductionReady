const mongoose = require('mongoose');
mongoose.pluralize(null);

var Schema = mongoose.Schema;

var contactMessagesSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    mobile: {type: String, required: true},
    message: {type: String, required: true},
    created_At: {type: String, default: Date.now},
    updated_At: {type: Date}
});


var contactMessagesModel = mongoose.model('contactMessages', contactMessagesSchema);

module.exports = contactMessagesModel;