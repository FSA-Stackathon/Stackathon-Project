const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

// GET /api/products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/snowboard
router.get("/snowboard", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        type: "snowboard",
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/ski
router.get("/ski", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        type: "ski",
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res, next) => {
  try {
    const singlProduct = await Product.findByPk(req.params.id);
    res.json(singlProduct);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
