const router = require('express').Router();
const {
  models: { Product, CartDetail, Cart },
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

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const singlProduct = await Product.findByPk(req.params.id);
    res.json(singlProduct);
  } catch (err) {
    next(err);
  }
});

router.post('/:productId/:userId', async (req, res, next) => {
  try {
    const createCartDetail = await CartDetail.create({
      product_quantity: 7,
      productId: req.params.productId,
    });
    const cart = await Cart.findOne({
      where: { userId: req.params.userId },
    });

    const addToCart = await cart.addCart_detail(createCartDetail);

    await cart.update(addToCart);
    await cart.update({ cartEmpty: false });

    res.json(cart);
  } catch (err) {
    next(err);
  }
});

router.get('/getcart/:userId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.params.userId },
    });
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
