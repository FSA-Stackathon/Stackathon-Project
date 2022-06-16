const Sequelize = require('sequelize');
const db = require('../db');
const Cart = require('./Cart');

const CartDetail = db.define('cart_detail', {
  product_quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = CartDetail;
