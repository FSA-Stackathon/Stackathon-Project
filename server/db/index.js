//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const OrderDetail = require("./models/OrderDetail");
const Cart = require("./models/Cart");

//associations could go here!
User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Cart.hasOne(Order);
Order.belongsTo(Cart);

Cart.hasMany(OrderDetail);
OrderDetail.belongsTo(Cart);

OrderDetail.belongsToMany(Product, { through: "Products_Ordered" });
Product.belongsToMany(OrderDetail, { through: "Products_Ordered" });

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderDetail,
    Cart,
  },
};
