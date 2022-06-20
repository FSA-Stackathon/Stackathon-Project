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

    const cartDetailwithProd = await CartDetail.findOne({
      where: { id: createCartDetail.id },
      include: { model: Product },
    });
    res.json(cartDetailwithProd);
  } catch (err) {
    next(err);
  }
});

// PUT /api/guests/cart - route to delete cart detail from guest cart
router.put("/cart", async (req, res, next) => {
  try {
    const { cartDetailsArr, productId, quantity } = req.body;
    let cartDetailToUpd;
    cartDetailsArr.map(async (item) => {
      if (item.product.id === parseInt(productId)) {
        cartDetailToUpd = await CartDetail.findByPk(item.id);
        await cartDetailToUpd.update({
          product_quantity: parseInt(quantity),
        });
      }
    });
    res.json(cartDetailToUpd);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/guests/cart/:productId - route to delete cart detail from guest cart
router.delete("/cart/:productId", async (req, res, next) => {
  try {
    const cartDetailsArr = req.body;
    let cartDetailToDestr;
    cartDetailsArr.map(async (item) => {
      if (item.product.id === parseInt(req.params.productId)) {
        cartDetailToDestr = await CartDetail.findByPk(item.id);
        await cartDetailToDestr.destroy();
      }
    });
    res.json(cartDetailToDestr);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
