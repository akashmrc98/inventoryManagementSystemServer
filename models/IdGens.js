const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const idSchema = new Schema({
  asset: {
    type: Number
  },
  product: {
    type: Number
  },
  service: {
    type: Number
  },
  user: {
    type: Number
  },
  accommodate: {
    type: Number
  }
});

idSchema.methods.updateAssetID = function(update) {
  this.asset = update;
  return this.save();
};

idSchema.methods.updateUserID = function(update) {
  this.user = update;
  return this.save();
};
idSchema.methods.updateServiceID = function(update) {
  this.service = update;
  return this.save();
};
idSchema.methods.updateProductID = function(update) {
  this.product = update;
  return this.save();
};
idSchema.methods.UpdateAccommodateID = function(update) {
  this.accommodate = update;
  return this.save();
};

module.exports = mongoose.model("IdGen", idSchema);
