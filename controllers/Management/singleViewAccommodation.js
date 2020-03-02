const Management = require("../../models/Management");

exports.singleViewAccommodation = async (req, res, next) => {
  try {
    const accommodateResult = await Management.findOne({ _id: req.params.id });
    if (accommodateResult) {
      res.status(200).json({
        status: 200,
        result: accommodateResult
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
