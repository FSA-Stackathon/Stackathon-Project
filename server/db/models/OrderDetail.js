const Sequelize = require("sequelize");
const db = require("../db");
// importing Product
const Product = require("./models/Product");

const OrderDetail = db.define("order_detail", {
  product_quantity: {
    type: Sequelize.INTEGER,
  },
});

OrderDetail.prototype.productTotal = async function () {
  const orderItem = await Product.findByPk(this.product_id);
  // productTotal is a function of (this.product_quantity X Product.price)
  const prodTotal = orderItem.price * this.product_quantity;
  return prodTotal;
};

module.exports = OrderDetails;
