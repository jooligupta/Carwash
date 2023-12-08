const ContactModel = require("../Models/Contact");
class ContactController {
  static createcontact = async (req, res) => {
    try {
      // const data = await ContactModel({
      //   firstname: req.body.firstname,
      //   lastname: req.body.lastname,
      //   email: req.body.email,
      //   contactnumber: req.body.contactnumber,
      //   alternatenumber: req.body.alternatenumber,
      //   message: req.body.message,
      //   messagetitle: req.body.messagetitle,
      //   address: {
      //     locality: req.body.locality,
      //     city: req.body.city,
      //     district: req.body.district,
      //     state: req.body.state,
      //     pincode: req.body.pincode,
      //   },
      // });
      let d = req.body;
      let data = await ContactModel.create(d);
      await data.save();
      // await data.save();
      res.status(200).json({ msg: "Contact successfully created!..", data });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" + err });
    }
  };
  static getcontactus = async (req, res) => {
    let pages = req.query.pages;
    try {
      let user = await ContactModel.find()
        .skip(10 * (pages - 1))
        .limit(10); //pagination 0f 10 user detail.
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ msg: "Data Not Found" });
    }
  };
}
module.exports = ContactController;
