/*
gameserver
This is a minimal app to allow phone apps to communicate with each other with persistent data.
The goal of this app was to build the simplest possible app that would meet that goal.
*/

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

/* 
    Connect to the database and create a Schema for the room data
*/
const mongoose = require('mongoose');
console.log(`MONGODB_URI: ${process.env.MONGODB_URI}`);
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gameserver', 
  {useNewUrlParser: true, useUnifiedTopology: true});
const Room = 
    mongoose.model('Room', 
      { room_id: String,
        user_id: String,
        data: mongoose.Schema.Types.Mixed, 
      }
);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req,res,next) => {
  res.json("Game Server v1.0: "+Date());
})

app.get('/debug',
  async (req,res,next) => {
    const rooms = await Room.find({});
    res.json(rooms);
  }
);

app.get("/room", 
  async (req,res,next) => {
    const room_id = req.query.room_id;
    const rooms = await Room.find({room_id});
    res.json(rooms);
})

app.post("/room", 
  async (req,res,next) => { 
    const room_id = req.body.room_id;
    const user_id = req.body.user_id; 
    const data = req.body.data; 
    let room = await Room.findOne({room_id,user_id});
    if (room) {
      room.data = data;
      //console.dir(room);
      await room.save();
    } else {
      room = new Room({room_id,user_id,data});
      await room.save();
    }
    res.json(room);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.json("404: "+req.url);
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
