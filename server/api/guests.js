const router = require("express").Router();

const {
  models: { Product, Cart, CartDetail },
} = require("../db");

// POST /api/guests/cart/:productId - route for guests to add item to localStorage cart
router.post("/cart/:productId", async (req, res, next) => {
  try {
    const createCartDetail = await CartDetail.create({
      product_quantity: 1,
      productId: req.params.productId,
    });
    res.json(createCartDetail);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
