const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require('../helper/connection');
const Schedule = require("./schedule");
const Ticket = sequelize.define('Ticket', {
    Id: {
        type: DataTypes.INTEGER,
        field: 'Id',
        primaryKey: true,
        autoIncrement: true
    },
    Price: {
        type: DataTypes.FLOAT,
        field: 'Price'
    },
    Seat: {
        type: DataTypes.INTEGER,
        field: 'Seat'
    },
    Available: {
        type: DataTypes.TINYINT,
        field: 'Available'
    }
}, {
    tableName: 'ticket',
    timestamps: false
});

Schedule.hasMany(Ticket);
Ticket.belongsTo(Schedule);

module.exports = Ticket;