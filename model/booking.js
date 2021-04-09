const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require('../helper/connection');
const Ticket = require("./ticket");
const User = require("./user");
const Booking = sequelize.define('Booking', {
    Id: {
        type: DataTypes.INTEGER,
        field: 'Id',
        primaryKey: true,
        autoIncrement: true
    },
    CustomerId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'Id',
        }
    },
    BookingDate: {
        type: DataTypes.DATE,
        field: 'BookingDate'
    }
}, {
    tableName: 'booking',
    timestamps: false
});

Ticket.hasOne(Booking);
Booking.belongsTo(Ticket);

module.exports = Booking;