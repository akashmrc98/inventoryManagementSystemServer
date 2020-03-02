const Assets = require("../../models/Asset");

exports.editMode = async (req, res, next) => {
  try {
    const asset = await Assets.findById(req.params.id);
    if (asset) {
      res.status(200).json({
        asset: asset
      });
    } else {
      res.status(500).json({
        message: "Server Unavailable!"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
    console.log(error);
  }
};

exports.editPut = async (req, res, next) => {
  try {
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

    try {
      const asset = await Assets.findByIdAndUpdate(req.body._id, {
        $set: {
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
        }
      });

      try {
        asset.save();
        if (asset) {
          res.status(200).json({
            message: "Asset Updated Successfully!"
          });
        }
      } catch (error) {
        res.json({
          status: 422,
          message: "Invalid Input/ Fill all required fields!"
        });
        console.log(error);
      }
    } catch (error) {
      res.json({
        status: 422,
        message: "Invalid Input/ Fill all required fields!"
      });
      console.log(error);
    }
  } catch (error) {
    res.json({
      status: 422,
      message: "Invalid Input/ Fill all required fields!"
    });
    console.log(error);
  }
};
