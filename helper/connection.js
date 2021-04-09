var mysql = require('mysql');
var config = require('../config');
var { Sequelize } = require('sequelize');
var mysqlUrl = config.mysql;

var conn = mysql.createConnection({
    host: mysqlUrl.host,
    user: mysqlUrl.user,
    password: mysqlUrl.password,
    database: mysqlUrl.database
});

const sequelize = new Sequelize(mysqlUrl.database, mysqlUrl.user, mysqlUrl.password, {
    host: mysqlUrl.host,
    dialect: 'mysql'
});

module.exports = sequelize;