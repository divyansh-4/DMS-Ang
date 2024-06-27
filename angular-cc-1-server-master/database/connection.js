const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('my_store', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;