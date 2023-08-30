const express = require('express');
const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
// const schedule = require('node-schedule');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require("cors");

const corsOptions = {
  origin: '*',
  credentials: false,            //access-control-allow-credentials:true
}

// connectDB();

const app = express();
app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(bodyParser.json());

app.use('/user', require('./routes/user-routes'));

module.exports = app;
