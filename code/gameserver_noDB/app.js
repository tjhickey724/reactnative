/*
gameserver
This is a minimal app to allow phone apps to communicate with each other.
The goal of this app was to build the simplest possible app that would meet that goal.
*/

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req,res,next) => {
  res.json("Game Server "+Date());
})

let rooms ={cs153aSum24:{tim:5,rotem:7}};

app.get("/room", (req,res,next) => {
  const id = req.query.id;
  console.log(`in app.get(/room) with id=${id}`)
  console.log(`and rooms[id] = ${JSON.stringify(rooms[id])}`)
  if (id in rooms) {
    res.json(rooms[id]);
  }else {
    res.json({});
  }
})

/*
 You can encode any JSON object x as a string with 
 s = JSON.stringify(x)
 and you can parse it from a string s to an object with
 x = JSON.parse(s)
*/
app.post("/room", (req,res,next) => {
  console.log('handling post request to room')
  console.dir(req.body)
  const id = req.body.id;
  const uid = req.body.uid;
  const data = req.body.data;
  if (id in rooms) {
    rooms[id][uid] = data;
  } else {
    rooms[id] = {};
    rooms[id][uid] = data;
  }
  res.json(rooms[id])
});

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

module.exports = app;
