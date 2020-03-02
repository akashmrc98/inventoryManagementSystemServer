const Asset = require("../../models/Asset");

exports.editProduct = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.body.assetId);
    const product = await asset.editProduct(
      req.body.productId,
      req.body.product
    );
    if (product) {
      res.status(200).json({
        message: "Product Updated!"
      });
    } else {
      res.status(500).json({
        message: "Server Unavailable!"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
    console.log(error);
  }
};
