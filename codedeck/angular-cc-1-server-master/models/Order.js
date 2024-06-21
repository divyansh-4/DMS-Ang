// src/models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const User = require('./User');

const Order = sequelize.define('Order', {
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

Order.belongsTo(User);

module.exports = Order;
