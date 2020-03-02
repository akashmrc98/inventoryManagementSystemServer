const Management = require("../../models/Management");

exports.DamagedAsset = async (req, res, next) => {
  try {
    const accommodateResults = await Management.find();
    var Damaged = accommodateResults.filter(result => {
      return result.condition == "Damaged";
    });
    if (Damaged) {
      res.status(200).json({
        status: 200,
        Damaged: Damaged
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
