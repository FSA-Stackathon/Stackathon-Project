const Sequelize = require('sequelize');
const db = require('../db');

const OrderDetail = db.define('order_detail', {
  product_quantity: {
    type: Sequelize.INTEGER,
  }
})

module.exports = OrderDetails;
