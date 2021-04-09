var express = require('express');
var router = express.Router();
router.use(express.json());
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var verifyToken = require('../authentication/verifyJWT');

const User = require('../model/user');

//sign up 
router.post('/signup', (req, res, next) => {

  User.findOne({
    where: {
      Username: req.body.Username
    }
  }).then(user => {
    if (user != null) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({error: 'Username has beed used'});
    } else {
      User.create({
        Username: req.body.Username,
        Email: req.body.Email,
        Password: bcrypt.hashSync(req.body.Password, 8),
        Phone: req.body.Phone
      }).then(user => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user)
      }) 
    }
  })  
});

//log in
router.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      Username: req.body.Username
    }
  }).then(user => {
    if (!user) {
      return res.status(404).json({ err: "user not found"});
    }
    var passwordIsValid = bcrypt.compareSync(req.body.Password, user.Password);
    if (!passwordIsValid) {
      return res.status(401).json({ auth: false, accessToken: null, reason: "Invalid Password!" });
    }
    var token = jwt.sign({ id: user.id }, config.secretKey, {
      expiresIn: 10800
    });
    res.statusCode = 200;
    res.json({ auth: true, accessToken: token, user });
    // res.json();
  }).catch(err => {
    next(err);
  })
});

//log out
router.get('/logout', verifyToken, (req, res, next) => {
  if (req.headers['authorization']) {
    res.removeHeader('authorization')
    res.json({status: "log out successful!"}) 
  } else {
    var err = new Error('You are not loged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = router;
