const Management = require("../../models/Management");

exports.viewReturned = async (req, res, next) => {
  try {
    const accommodateResults = await Management.find();
    var Returned = accommodateResults.filter(result => {
      return result.return_on !== null;
    });
    if (Returned) {
      res.status(200).json({
        status: 200,
        Returned: Returned
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
