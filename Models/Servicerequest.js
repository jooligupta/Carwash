const mongoose = require("mongoose");

const ServicerequestSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "user",
    //   default: " ",
    // },
    firstname: {
      type: String,
      default: " ",
    },
    lastname: {
      type: String,
      default: " ",
    },
    email: {
      type: String,
      default: " ",
    },
    contactnumber: {
      type: Number,
      default: " ",
    },
    alternatenumber: {
      type: Number,
      default: " ",
    },
    paymentMode: {
      type: String,
      default: "COD",
    },
    serviceat: {
      type: String,
      default: " ",
    },

    PickUp_location: {
      locality: { type: String, trim: true, default: " " },
      city: { type: String, trim: true, default: " " },
      district: { type: String, trim: true, default: " " },
      state: { type: String, trim: true, default: " " },
      pincode: { type: Number, default: " " },
    },

    status: {
      type: Number,
      default: " ",
    },
  },
  { timestamps: true }
);
const ServiceModel = mongoose.model("Service", ServicerequestSchema);
module.exports = ServiceModel;
