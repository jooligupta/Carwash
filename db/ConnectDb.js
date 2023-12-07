const mongoose = require("mongoose");
// const url =
//   "mongodb+srv://jooligupta2000:jooli12345@carwash.1dytxls.mongodb.net/?retryWrites=true&w=majority";

const Connectdb = () => {
  return mongoose
    .connect(process.env.DB_URL)
    .then((data) => {
      console.log("mongodb connected ");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = Connectdb;
