// Dependencies
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('./config/db');
const path = require('path');
const port = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


//new testing commit fazi
app.use('/RecentWorkImages', express.static('RecentWorkImages'));
app.use('/HeaderImages', express.static('HeaderImages'));
app.use('/RecentWorkMultipleImages', express.static('RecentWorkMultipleImages'));

const adminRoutes = require('./routes/adminRoute');
const otherRoutes = require('./routes/otherRoutes');
const workRoutes = require('./routes/mediaRoutes');

app.use('/admin', adminRoutes);
app.use('/other', otherRoutes);
app.use('/work', workRoutes);

app.use(express.static(path.join(__dirname, '/frontend')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/index.html'));
});
app.listen(port, function (err, res) {
    console.log(`Port ${port} Running Successfully in ${process.env.PORT} mode!`);
});