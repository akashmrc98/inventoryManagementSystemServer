const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Recycle = new Schema({
  username: {
    type: String,
    required: true
  },
  mobile: {
    type: String
  },
  email: {
    type: String
  },
  Assets: [
    {
      asset_id: {
        type: String,
        required: true
      },
      product_name: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      vendor: {
        type: String
      },
      vendor_contact_no: {
        type: String
      },
      vendor_address: {
        type: String
      },
      summary: {
        type: String
      },
      comments: {
        type: String
      },
      notes: {
        type: String
      },
      product_quantity: {
        type: Number,
        required: true
      },
      total_price: {
        type: Number,
        required: true
      },
      time_stamp: {
        type: Date,
        default: Date.now,
        required: true
      },
      product: [
        {
          product_id: {
            type: String
          },
          purchased_date: {
            type: String
          },
          warranty_period: {
            type: String
          },
          model_no: {
            type: String
          },
          serial_no: {
            type: String
          },
          unit_price: {
            type: Number
          }
        }
      ],
      services: [
        {
          service_id: {
            type: String
          },
          serviced_by: {
            type: String
          },
          serviced_on: {
            type: String
          },
          service_no: {
            type: String
          },
          address: {
            type: String
          },
          notes: {
            type: String
          },
          cost: {
            type: Number
          }
        }
      ]
    }
  ],

  Manage: [
    {
      ticket_no: {
        type: String,
        required: true
      },
      purpose: {
        type: String
      },
      in_charge: {
        type: String
      },
      in_charge_no: {
        type: String
      },
      bought_on: {
        type: String
      },
      return_on: {
        type: String
      },
      remarks: {
        type: String
      },
      notes: {
        type: String
      },
      condition: {
        type: String
      },
      comments: {
        type: String
      },
      time_stamp: {
        type: Date,
        default: Date.now,
        required: true
      },

      products: [
        {
          product_id: {
            type: String
          },
          product_name: {
            type: String
          },
          stock: {
            type: Number
          }
        }
      ]
    }
  ]
});

Recycle.methods.assetToRecycleBin = async function(asset) {
  var assets = await this.Assets;
  await assets.push(asset);
  this.Assets = assets;
  return this.save();
};

Recycle.methods.mangeToRecycleBin = function(manage) {
  var manages = this.Manage;
  manages.push(manage);
  this.Manage = manages;
  return this.save();
};

Recycle.methods.RestoreAssets = function(asset_id) {
  var assets = this.Assets;
  index = assets.findIndex(res => {
    return res.asset_id == asset_id;
  });
  assets.splice(index, 1);
  this.Assets = assets;
  return this.save();
};

module.exports = mongoose.model("Recycle", Recycle);
