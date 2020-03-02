const Asset = require("../../models/Asset");

exports.editService = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.body.assetId);
    const product = await asset.editService(
      req.body.serviceId,
      req.body.service
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
    console.log(error);
  }
};
