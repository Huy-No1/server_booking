var express = require('express');
var bookingRouter = express.Router();
bookingRouter.use(express.json());

const verifyToken = require('../authentication/verifyJWT');
const Booking = require('../model/booking');
const Ticket = require('../model/ticket');
const Movie = require('../model/movie');
const Schedule = require('../model/schedule');

//get all movie
bookingRouter.get('/get-all-movie', (req, res, next) => {
  Movie.findAll()
    .then(movie => {
      res.json(movie);
    }).catch(err => {
      next(err);
    })
});

//get all the schedule
bookingRouter.post('/get-all-time', (req, res, next) => {
  Schedule.findAll({
    where: {
      MovieId: req.body.MovieId
    }
  }).then(schedule => {
    res.setHeader('Content-Type', 'application/json'),
      res.json(schedule)
  }).
    catch(err => {
      next(err);
    })
})

//get all movie from schedule
bookingRouter.post('/get-movie', (req, res, next) => {
  Ticket.findAll({
    where: {
      ScheduleId: req.body.ScheduleId
    }
  }).then(ticket => {
    res.setHeader('Content-Type', 'application/json'),
      res.json(ticket);
  }).catch(err => next(err))
})

//book ticket
bookingRouter.post('/booking-ticket', (req, res, next) => {
  let arr= req.body.TicketId;
  for(let i=0; i<arr.length; i++){
    Booking.create({
      TicketId: arr[i],
      CustomerId: req.body.CustomerId,
      BookingDate: req.body.BookingDate
    }).then(booking => {
      Ticket.findOne({
        where: {
          Id: arr[i]
        }
      }).then(ticket => {
        ticket.Available = 0;
        ticket.save();
        res.json(ticket);
      }).catch(err => next(err))
    }).catch(err => next(err))
  }
})

//drop ticket
bookingRouter.post('/drop-ticket', (req, res, next) => {
  Booking.destroy({
    where: {
      TicketId: req.body.TicketId,
    }
  }).then(booking => {
    Ticket.findOne({
      where: {
        Id: req.body.TicketId
      }
    }).then(ticket => {
      ticket.Available = 1;
      ticket.save();
      res.send("OK");
    }).catch(err => next(err))
  }).catch(err => next(err));
});

//booking history
bookingRouter.post('/booking-history', (req, res, next) => {
  Booking.findAll({
    where: {
      CustomerId: req.body.CustomerId,
    },
    include: [{
      model: Ticket,
      attributes: ["Price", "Seat"],
      include: [
        {
          model: Schedule,
          attributes: ["Screen", "Time"],
          include: [
            {
              model: Movie,
              attributes: ["Name"]
            },
          ]
        }
      ]
    }]
  }).then(booking => {
    res.json(booking)
  }).catch(err => next(err))
})



module.exports = bookingRouter;
