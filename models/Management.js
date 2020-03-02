const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ManagementSchema = new Schema({
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
  ],
  non_transactional_products: [
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
});

ManagementSchema.methods.addToCart = function(product_id, product_name, stock) {
  var products = this.products;
  var non_transactional_products = this.non_transactional_products;
  non_transactional_products.push({
    product_id: product_id,
    product_name: product_name,
    stock: stock
  });
  products.push({
    product_id: product_id,
    product_name: product_name,
    stock: stock
  });
  this.products = products;
  this.non_transactional_products = this.non_transactional_products;
  return this.save();
};

ManagementSchema.methods.returnAsset = function(info) {
  this.return_on = info.return_on;
  this.remarks = info.remarks;
  this.notes = info.notes;
  this.condition = info.condition;
  this.comments = info.comments;
  return this.save();
};

ManagementSchema.methods.UpdateAccommodation = function(info) {
  this.purpose = info.purpose;
  this.in_charge = info.in_charge;
  this.in_charge_no = info.in_charge_no;
  this.bought_on = info.bought_on;
  this.return_on = info.return_on;
  this.remarks = info.remarks;
  this.notes = info.notes;
  this.condition = info.condition;
  this.comments = info.comments;
  return this.save();
};

ManagementSchema.methods.UpdateDeductedStock = function(id, stock) {
  var products = this.products;
  var index = products.findIndex(item => {
    return item.product_id == id;
  });
  updatedStock = products[index].stock - stock;
  if (updatedStock < 0) {
    return false;
  } else {
    products[index].stock = updatedStock;
    this.products = products;
    return this.save();
  }
};

module.exports = mongoose.model("Management", ManagementSchema);
