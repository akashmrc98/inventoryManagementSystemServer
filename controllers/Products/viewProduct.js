const Assets = require("../../models/Asset");

exports.viewProducts = async (req, res, next) => {
  try {
    var product = await Assets.findById(req.params.id);
    product = product.product;
    if (product) {
      res.status(200).json({
        products: product
      });
    } else {
      res.status(500).json({
        message: "Server Issues!"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
