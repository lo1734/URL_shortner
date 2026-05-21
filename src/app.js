const express = require('express');
const urlRoutes = require('./routes/urlRoutes');
const errorHandler = require('./middleware/errorHandler');
const morgan = require('morgan');
const cors = require('cors');
const authRoutes = require('./auth/authRoutes');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(errorHandler);
app.use(express.json());
app.use('/', urlRoutes);
app.use('/auth',authRoutes);
module.exports= app;

