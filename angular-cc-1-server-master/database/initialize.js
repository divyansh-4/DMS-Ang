const sequelize = require('./connection');
const Product = require('../models/Product');
const User = require('../models/User');
const CartItem = require('../models/CartItem');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const CartProduct=require('../models/CartProduct');

const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Ensure models are defined without timestamps
        await Product.sync({ alter: true });
        await User.sync({ alter: true });
        await CartItem.sync({ alter: true });
        await Order.sync({ alter: true });
        await OrderItem.sync({ alter: true });
        await CartProduct.sync({ alter: true });

        console.log('Database synchronized');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = initializeDatabase;
