const Asset = require("../../models/Asset");
const IdGen = require("../../models/IdGens");
exports.addServices = async (req, res, next) => {
  try {
    var ids = await IdGen.find();
    ids = ids[0];
    service_id = ids.service + 1;

    await ids.updateServiceID(service_id);
    service_id = "alcService" + service_id;

    const serviced_by = req.body.serviced_by.toLowerCase();
    const serviced_on = req.body.serviced_on.toLowerCase();
    const service_no = req.body.service_no.toLowerCase();
    const address = req.body.address.toLowerCase();
    const notes = req.body.notes.toLowerCase();
    const cost = parseFloat(req.body.cost);

    const asset = await Asset.findById(req.params.id);
    try {
      const service = await asset.addService(
        service_id,
        serviced_by,
        serviced_on,
        service_no,
        address,
        notes,
        cost
      );
      if (service) {
        res.status(200).json({
          message: "Service Added Successfully!"
        });
      } else {
        res.status(422).json({
          message: "Invalid Inputs!"
        });
      }
    } catch (error) {
      if (error) {
        console.log(error.name);
        res.json({
          status: 422,
          message: "Invalid Input/Fill all the fields."
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
