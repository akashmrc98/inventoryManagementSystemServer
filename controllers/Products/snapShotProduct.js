const Asset = require("../../models/Asset");

exports.snapProduct = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.body.assetId);
    const product = asset.snapShotProduct(req.body.productId);
    if (product) {
      res.status(200).json({
        product: product
      });
    } else {
      res.status(500).json({
        message: "Server Unavailable"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};
