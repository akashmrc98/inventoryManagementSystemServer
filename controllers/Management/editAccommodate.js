const Management = require("../../models/Management");

exports.editAccommodation = async (req, res, next) => {
  try {
    const management = await Management.findById(req.params.id);
    try {
      await management.UpdateAccommodation(req.body.accommodation);
    } catch (error) {}
  } catch (error) {
    console.log(error);
  }
};
