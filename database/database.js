const sequelize = require('sequelize');

const connection = new sequelize('questionguide', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;