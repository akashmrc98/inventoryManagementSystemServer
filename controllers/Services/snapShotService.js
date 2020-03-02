const Asset = require("../../models/Asset");

exports.snapService = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.body.assetId);
    const service = asset.snapShotService(req.body.serviceId);
    if (service) {
      res.status(200).json({
        service: service
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
