const Asset = require("../../models/Asset");

exports.deleteProduct = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.body.assetId);
    const productDelete = asset.deleteProduct(req.body.productId);
    if (productDelete) {
      res.status(200).json({
        message: "Product Deleted!"
      });
    } else {
      res.status(500).json({
        message: "Server Unavailable!"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};
