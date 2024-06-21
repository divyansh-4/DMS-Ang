// src/models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Product = sequelize.define('Product', {
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
    }
    
},{timestamps:false})
;

module.exports = Product;
