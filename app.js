
require('dotenv').config('./.env')
const express = require('express');
const { generatedErrors } = require('./middleware/error');
const ErrorHandler = require('./utils/ErrorHandler');
const { connectDB } = require('./models/config');
const cors=require('cors')
const fileupload=require('express-fileupload')
const app = express();

// Body parser middleware
app.use(cors({ credentials: true, origin: "https://frontendolx.vercel.app/" }));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
require('./models/config')
const session=require('express-session')
const cookieparser=require('cookie-parser')
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:process.env.EXPRESS_SECRET
}))

app.use(cookieparser())

// express file upload
app.use(fileupload())
const logger = require('morgan');
app.use(logger('tiny'));

// Your routes

app.get('/', (req, res) => {
    res.send("hello");
});

app.use('/', require('./routes/user'));
app.all("*", (req, res, next) => {
    next(new ErrorHandler(`requested url not found ${req.url}`, 404));
});

app.use(generatedErrors);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

