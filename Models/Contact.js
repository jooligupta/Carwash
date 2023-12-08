const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
    },
    contactnumber: {
      type: Number,
    },
    alternatenumber: {
      type: Number,
    },
    message: {
      type: String,
    },

    messagetitle: {
      type: String,
    },
    address: {
      locality: { type: String, default: " " },
      city: { type: String, default: " " },
      district: { type: String, default: " " },
      state: { type: String, default: " " },
      pincode: { type: Number, default: " " },
    },
  },
  { timestamps: true }
);
const ContactModel = mongoose.model("contact", ContactSchema);
module.exports = ContactModel;
