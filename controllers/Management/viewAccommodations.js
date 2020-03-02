const Management = require("../../models/Management");

exports.viewAccommodations = async (req, res, next) => {
  try {
    const accommodateResults = await Management.find().sort({ ticket_no: -1 });
    if (accommodateResults) {
      res.status(200).json({
        status: 200,
        results: accommodateResults
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
