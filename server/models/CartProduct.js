// src/models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const CartProduct = sequelize.define('CartProduct', {
    prodId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    rating: {
        type: DataTypes.STRING
    },
    info: {
        type: DataTypes.TEXT
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

}, { timestamps: false })
    ;

module.exports = CartProduct;
// CREATE TABLE CartProducts(cartId INT AUTO_INCREMENT PRIMARY KEY, prodId INT NOT NULL, userId INT NOT NULL, name VARCHAR(255) NOT NULL, image VARCHAR(255), price decimal(10, 2) NOT NULL, rating VARCHAR(255), info TEXT, qty INT NOT NULL);
