// src/models/CartItem.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const User = require('./User');
const Product = require('./Product');

const CartItem = sequelize.define('CartItem', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { timestamps: false });

CartItem.belongsTo(User);
CartItem.belongsTo(Product);

module.exports = CartItem;
