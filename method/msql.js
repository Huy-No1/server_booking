const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const config= require('../config');

const connection = mysql.createConnection({
    config.mysql
});


connection.connect(function(err){
  (err) ? console.log(err) : console.log(connection);
});


app.get('/get-all-movie', (req, res) => {
  var sql = "SELECT * FROM movie ORDER BY id DESC";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json(results);
  });
});


app.post('/bookingticket', function(req, res) {
  var sql = "INSERT "
          + "INTO booking(customerId, ticketId, BookingDate) "
          + "VALUES('"
          +   req.body.customerId+ "','" 
          +   req.body.ticketId + "','" 
          +   req.body.BookingDate+"')";

  connection.query(sql, function (err, results) {
    if(err) throw err;
    res.json({news: results});
  });
});


app.get('/booking-history', (req, res) => {
  var sql = "SELECT * FROM booking"
          + "WHERE id='"
          + req.body.CustomerId+"'";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({news: results});
  });
});


app.post('/drop-ticket', (req, res) => {
  var sql = "DELETE FROM booking "
          + "WHERE id='"
          + req.body.id 
          +"'";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({news: results});
  });
});
 

app.post('/login', (req, res) => {
    var sql = "SELECT * FROM user "
            + "WHERE id='"
            + req.body.CustomerId 
            +"'"
            +"ORDER BY Id DESC"
    connection.query(sql, function(err, results) {
      if (err) throw err;
      res.json({news: results});
    });
  });


  app.post('/signup', (req, res) => {
      var username= req.body.username;
      var password= req.body.password;
      var phone= req.body.phone;
      var email= req.body.email;
    var sql = "INSERT INTO user(username, password, phone, email) "
            + "VALUES('"
            +   username+ "','" 
            +   password + "','" 
            +   phone + "','"
            +   email +"')";
    connection.query(sql, function(err, results) {
      if (err) throw err;
      res.json({news: results});
    });
  });


  app.post('/get-all-time', (req, res, next) => {
    var sql = "SELECT ticket"
          + "WHERE id='"
          + req.body.Id+"'";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({news: results});
  });
  })
  
  //get all movie from schedule
app.post('/get-movie', (req, res, next) => {
    var sql = "SELECT * FROM ticket"
          + "WHERE id='"
          + req.body.Id+"'"
          + "ORDER BY id DESC"
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({news: results});
  });