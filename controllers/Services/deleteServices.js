const Asset = require("../../models/Asset");

exports.deleteService = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.body.assetId);
    const productDelete = await asset.deleteService(req.body.serviceId);
    if (productDelete) {
      res.status(200).json({
        message: "Service Deleted!"
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
