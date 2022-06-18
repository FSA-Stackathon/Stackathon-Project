const { requireToken } = require('./GateKeepingMiddleWare.js');

const router = require('express').Router();
const {
  models: { Product, CartDetail, Cart, Order },
} = require('../db');

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/snowboard
router.get('/snowboard', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        type: 'snowboard',
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/ski
router.get('/ski', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        type: 'ski',
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/getcart/
router.get('/getcart', requireToken, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.id },
      include: { model: CartDetail, include: { model: Product } },
    });

    res.send(cart);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
router.get('/:id', requireToken, async (req, res, next) => {
  try {
    const singlProduct = await Product.findByPk(req.params.id);
    res.json(singlProduct);
  } catch (err) {
    next(err);
  }
});

// POST /api/products/:productId
router.post('/:productId/', requireToken, async (req, res, next) => {
  try {
    const createCartDetail = await CartDetail.create({
      product_quantity: 7,
      productId: req.params.productId,
    });
    const cart = await Cart.findOne({
      where: { userId: req.user.id },
    });

    const addToCart = await cart.addCart_detail(createCartDetail);

    await cart.update(addToCart);
    await cart.update({ cartEmpty: false });

    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:productId
router.put('/:productId', requireToken, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.id },
    });

    const cartItem = await cart.getCart_details({
      where: { productId: req.params.productId },
    });
    const singleCartItem = cartItem[0];

    //product_quantity is hardcoded. Need to update
    await singleCartItem.update({ product_quantity: 100 });

    res.json(singleCartItem);
  } catch (err) {
    next(err);
  }
});

router.post('/orders', requireToken, async (req, res, next) => {
  try {
    const order = await Order.create({
      userId: req.user.id,
      order_total: 0,
      order_status: false,
    });

    const cart = await Cart.findOne({ where: { userId: req.user.id } });

    //create the association between cart_details and order
    const cartDetails = await cart.getCart_details();
    await order.addCart_details(cartDetails);

    //removes the association between cart and cart_details
    await cart.removeCart_details();

    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.delete('/:productId', requireToken, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.id },
    });
    const cartItem = await cart.getCart_details({
      where: { productId: req.params.productId },
    });

    await cartItem[0].destroy();
    res.send(cartItem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
