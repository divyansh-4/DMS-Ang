const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const User = require('./User');

const CartItem = sequelize.define('CartItem', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    cartDetails: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, { timestamps: false });

// CartItem.belongsTo(User, { foreignKey: 'userId' });

module.exports = CartItem;


// CREATE TABLE CartItems(userId INT PRIMARY KEY,cartDetails JSON NOT NULL);
// CREATE TABLE Products(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, image VARCHAR(255), price VARCHAR(255) NOT NULL, rating INT, info TEXT);
