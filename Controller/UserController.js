const UserModel = require("../Models/User");

class UserController {
  static createsupervisior = async (req, res) => {
    try {
      let d = req.body;
      let data = await UserModel.create(d);
      res
        .status(200)
        .json({ msg: "supervisior successfully created!...", data });
    } catch (err) {
      res.status(500).json({ msg: "Supervisior not created" });
    }
  };
  // static getuser = async (req, res) => {
  //   let pages = req.query.pages;
  //   let role = req.query.role;
  //   try {
  //     let user = await UserModel.find()
  //       .skip(10 * (pages - 1))
  //       .limit(10); //pagination 0f 10 user detail.
  //     res.status(200).json(user);
  //   } catch (error) {
  //     res.status(500).json({ msg: "Data Not Found" });
  //   }
  // };
  static getsupervisior = async (req, res) => {
    let pages = req.query.pages;
    let role = req.query.role; // assuming the role is passed in the query parameters

    try {
      let query = {};

      // If role is provided, add it to the query
      if (role) {
        query = { role: role };
      }

      let user = await UserModel.find(query)
        .skip(10 * (pages - 1))
        .limit(10); // pagination of 10 user details

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ msg: "Data Not Found" });
    }
  };
  static getsinglesupervisior = async (req, res) => {
    try {
      const userId = req.params.id;
      const role = req.query.role; // assuming the role is passed in the query parameters

      let query = { _id: userId };

      // If role is provided, add it to the query
      if (role) {
        query.role = role;
      }

      const data = await UserModel.findOne(query);
      if (!data) {
        return res.status(404).json({ msg: "User not found" });
      }

      res.status(200).json({ msg: "User successfully retrieved!", data });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" + err });
    }
  };
  static edituser = async (req, res) => {
    try {
      const data = await UserModel.findByIdAndUpdate(req.params.id, {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        mobilenumber: req.body.mobilenumber,
        status: req.body.status,
        serviceat: req.body.serviceat,
        role: req.body.role,
        description: req.body.description,
        profileImage: req.body.profileImage,
        paymentMode: req.body.paymentMode,
        isActive: req.body.isActive,
        alternateNumber: req.body.alternateNumber,
      });
      const d1 = await data.save();
      res.status(500).json({ message: "Successfully edit ", data });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" + err });
    }
  };

  static deleteUser = async (req, res) => {
    try {
      const deleteuser = await UserModel.deleteOne({ _id: req.params.id });
      // deleteuser.remove({ _id: id });
      res.status(200).send({
        status: "Success",
        message: "User has been deleted Successfully",
        deleteuser,
      });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" + err });
    }
  };
  // static registerUser = async (req, res) => {
  //   try {
  //     const { email } = req.body;
  //     const user = new User({ email });

  //     // Generate and save a unique verification token
  //     user.verificationToken = uuidv4();
  //     await user.save();

  //     const verificationLink = `http://yourdomain.com/api/users/verify?token=${user.verificationToken}`;

  //     // Send verification email
  //     await transporter.sendMail({
  //       to: email,
  //       subject: "Verify Your Email",
  //       html: `Click <a href="${verificationLink}">here</a> to verify your email.`,
  //     });

  //     res.status(200).json({
  //       message: "User registered. Check your email for verification.",
  //     });
  //   } catch (error) {
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // };
  // static verifyUser = async (req, res) => {
  //   try {
  //     const { token } = req.query;
  //     const user = await UserModel.findOne({ verificationToken: token });

  //     if (!user) {
  //       return res.status(404).json({ error: "User not found" });
  //     }

  //     // Mark the user as verified
  //     user.isVerified = true;
  //     user.verificationToken = null;
  //     await user.save();

  //     res.status(200).json({ message: "User verified successfully" });
  //   } catch (error) {
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // };
}

module.exports = UserController;
