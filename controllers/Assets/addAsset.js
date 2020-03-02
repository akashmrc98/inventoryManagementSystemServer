const Assets = require("../../models/Asset");
const IdGen = require("../../models/IdGens");

exports.addAsset = async (req, res, next) => {
  try {
    var ids = await IdGen.find();
    ids = ids[0];
    asset_id = ids.asset + 1;
    await ids.updateAssetID(asset_id);

    asset_id = "alcAsset" + asset_id;

    const product_name = req.body.product_name.toLowerCase();
    const category = req.body.category.toLowerCase();
    const vendor = req.body.vendor.toLowerCase();
    const vendor_contact_no = req.body.vendor_contact_no;
    const vendor_address = req.body.vendor_address.toLowerCase();
    const summary = req.body.summary.toLowerCase();
    const comments = req.body.comments.toLowerCase();
    const notes = req.body.notes.toLowerCase();
    const product_quantity = parseInt(req.body.product_quantity);
    const total_price = parseFloat(req.body.total_price);

    const assets = await new Assets({
      asset_id: asset_id,
      product_name: product_name,
      category: category,
      vendor: vendor,
      vendor_contact_no: vendor_contact_no,
      vendor_address: vendor_address,
      summary: summary,
      comments: comments,
      notes: notes,
      product_quantity: product_quantity,
      total_price: total_price
    });

    try {
      await assets.save();
    } catch (error) {
      if (error) {
        console.log(error.name);
        res.json({
          status: 422,
          message: "Invalid Input/Fill all the fields."
        });
      }
    }

    if (assets) {
      res.status(200).json({
        message: "Asset Added Successfully!"
      });
    } else {
      res.status(422).json({
        message: "Invalid Inputs!"
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(204).json({
      message: "Invalid Inputs!"
    });
  }
};
