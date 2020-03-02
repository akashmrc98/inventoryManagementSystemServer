const Asset = require("../../models/Asset");

exports.viewAssets = async (req, res, next) => {
  try {
    const assets = await Asset.find().sort({ time_stamp: -1 });
    if (assets) {
      res.status(200).json({
        assets: assets
      });
    } else {
      res.status(500).json({
        message: "Server unavailable!"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
