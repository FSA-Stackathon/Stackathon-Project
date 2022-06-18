const {
  models: { Product, Cart, CartDetail },
} = require('../db');
const router = require('express').Router();
const { requireToken } = require('./GateKeepingMiddleWare');

// GET /api/carts/getCart
router.get('/getCart', requireToken, async (req, res, next) => {
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

// POST /api/carts/:productId
router.post('/:productId', requireToken, async (req, res, next) => {
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

// PUT /api/carts/:productId
router.put('/:productId/', requireToken, async (req, res, next) => {
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

//DELETE /api/carts/:productId
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
