const Asset = require("../../models/Asset");

exports.addProduct = async (req, res, next) => {
  try {
    const product = await Asset.findById(req.body.id);
    const load = await product.loadProduct(req.body);
    if (load) {
      res.status(200).json({
        message: "Product Added!"
      });
    } else {
      res.status(500).json({
        message: "Server issue!"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
