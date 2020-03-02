const Assets = require("../../models/Asset");

exports.viewServices = async (req, res, next) => {
  try {
    var services = await Assets.findById(req.params.id);
    services = services.services;
    if (services) {
      res.status(200).json({
        services: services
      });
    } else {
      res.status(200).json({
        status: 422,
        message: "Bad Request!"
      });
    }
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: "Results not found!"
    });
  }
};
