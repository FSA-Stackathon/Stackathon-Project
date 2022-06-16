const { requireToken } = require('./GateKeepingMiddleWare');

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
      include: CartDetail,
    });
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

router.put('/:productId/:userId', requireToken, async (req, res, next) => {
  try {
    console.log(req.user);
    const cart = await Cart.findOne({
      where: { userId: req.params.userId },
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

module.exports = router;
