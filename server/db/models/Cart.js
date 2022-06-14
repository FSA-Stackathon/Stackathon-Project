const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('carts', {
  quantity_products: {
    type: Sequelize.INTEGER,
    validate: { min: 0 } // How do we set max quantity so that it isn't greater than
                         // the product inventory?
  }
})

module.exports = Cart;
