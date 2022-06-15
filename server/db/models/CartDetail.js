const Sequelize = require('sequelize');
const db = require('../db');
const Cart = require('./Cart')

const CartDetail = db.define('cart_detail', {
  product_quantity: {
    type: Sequelize.INTEGER,
  },
});

// const createAndAssignCartDetail = async (detail) => {
//   const cartDetail = await CartDetail.create({ quantity: 1 })
//   await
// };

// CartDetail.afterCreate()

module.exports = CartDetail;
