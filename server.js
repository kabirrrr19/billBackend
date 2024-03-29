const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const routes = require('./routes/Router');

const mongoose = require('mongoose');
const dbUrl = require('./properties').DB_URL;
const PORT = process.env.PORT || 3000 



///////////

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

/////////



const billModel = require('./model/bill.model');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res, next) {
  res.render("index", {
    title: "Home Page",
    message: "Welcome to Home Page. \n Go to the /bills endpoint for further use",
  });
})
app.get("/data", function (req, res, next) {
  res.render("index", {
    title: "Data Page",
    message: "Welcome to the Data page",
  });
});
app.use('/bills', routes)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
})
