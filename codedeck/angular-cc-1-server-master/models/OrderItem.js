// src/models/OrderItem.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Order = require('./Order');
const Product = require('./Product');

const OrderItem = sequelize.define('OrderItem', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, { timestamps: false });

OrderItem.belongsTo(Order);
OrderItem.belongsTo(Product);

module.exports = OrderItem;
