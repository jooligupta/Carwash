const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const OTPModel = require("../Models/OTP");
const jwt = require("jsonwebtoken");
class AuthController {
  static userregister = async (req, res) => {
    const {
      firstname,
      lastname,
      address,
      email,
      password,
      mobilenumber,
      alternatenumber,
    } = req.body;
    try {
      const existinguser = await UserModel.findOne({ email: email });
      if (existinguser) {
        return res.status(401).json({ message: "Username already exists" });
      } else {
        const hashPassword = await bcrypt.hash(password, 10);
        const data = await UserModel({
          firstname,
          lastname,
          address,
          email,
          password: hashPassword,
          mobilenumber,
          alternatenumber,
        });
        // const result = await data.save();
        res.status(200).json({
          status: "success",
          message: "User registration Successfully!...",
          result,
        });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" + err });
    }
  };
  static sendotp = async function (req, res) {
    try {
      const { email } = req.body;

      const otp = Math.floor(100000 + Math.random() * 900000);

      var transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "jooligupta2000@gmail.com",
          pass: "izdmwplsjbdmuiim",
        },
      });

      const info = await transport.sendMail({
        from: '"Your Name" <jooligupta2000@gmail.com>', // Update with your name and email
        to: email,
        subject: "Email Verification OTP",
        text: `Your OTP for email verification is: ${otp}`,
        html: `<b>Your OTP for email verification is: ${otp}</b>`,
      });
      // Save OTP in MongoDB
      // const otpRecord = new OTPModel({
      //   email: email,
      //   otp: otp.toString(), // Convert OTP to string before saving
      // });

      transport.sendMail(info, (err, result) => {
        if (err) {
          console.log("Error");
        }
        // otpRecord.save((err, result) => {
        if (err) {
          console.log("Error saving OTP to MongoDB:", err);
          res.status(500).json({
            success: false,
            message: "Internal Server Error - Failed to save OTP",
          });
        } else {
          // console.log("OTP saved to MongoDB:", result);

          res.status(200).json({
            message: "OTP sent successfully. Check your email for OTP.",
            otp: otp,
          });
        }
      });

      // res.status(200).json({
      //   message: "OTP sent successfully. Check your email for OTP.",
      //   otp: otp,
      // });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
  // static sendotp = async (req, res) => {
  //   try {
  //     const { email } = req.body;
  //     const user = await OTPModel.findOne({ email: email });
  //     if (user) {
  //       res.status(500).json({
  //         success: true,
  //         message: "User already registered!...",
  //       });
  //     }

  //     const otp = Math.floor(100000 + Math.random() * 900000);

  //     // Nodemailer setup
  //     const transporter = nodemailer.createTransport({
  //       service: "gmail",
  //       auth: {
  //         user: "jooligupta2000@gmail.com",
  //         pass: "izdmwplsjbdmuiim",
  //       },
  //     });

  //     // Send OTP email
  //     const info = await transporter.sendMail({
  //       from: '"Your Name" <jooligupta2000@gmail.com>', // Update with your name and email
  //       to: email,
  //       subject: "Email Verification OTP",
  //       text: `Your OTP for email verification is: ${otp}`,
  //       html: `<b>Your OTP for email verification is: ${otp}</b>`,
  //     });

  //     // Save OTP in MongoDB
  //     const otpRecord = new OTPModel({
  //       email: email,
  //       otp: otp.toString(), // Convert OTP to string before saving
  //     });

  //     await otpRecord.save();
  //     transporter.sendMail(info, (err, result) => {
  //       if (err) {
  //         console.log("Error is sending Mail", err);
  //       }
  //     });
  //     res.status(200).json({
  //       message: "OTP resent successfully. Check your email for OTP.",
  //       otp: otp,
  //     });
  //     // res.status(500).json({ success: true, message: "Success", otpRecord });
  //   } catch (error) {
  //     console.error(error);
  //     res
  //       .status(500)
  //       .json({ success: false, message: "Internal Server Error" });
  //   }
  // };
  // static sendotp = async (req, res) => {};
  // static sendotp = async (req, res) => {
  //   try {
  //     const { email } = req.body;
  //     // const user = await OTPModel.findOne({ email: email });
  //     // if (user) {
  //     //   return res.json({
  //     //     success: false,
  //     //     message: "User already registered!...",
  //     //   });
  //     // }

  //     const otp = Math.floor(100000 + Math.random() * 900000);

  //     // Nodemailer setup
  //     const transporter = nodemailer.createTransport({
  //       service: "gmail",
  //       auth: {
  //         user: "jooligupta2000@gmail.com",
  //         pass: "izdmwplsjbdmuiim",
  //       },
  //     });

  //     // Send OTP email
  //     const info = await transporter.sendMail({
  //       from: '"Your Name" <jooligupta2000@gmail.com>',
  //       to: email,
  //       subject: "Email Verification OTP",
  //       text: `Your OTP for email verification is: ${otp}`,
  //       html: `<b>Your OTP for email verification is: ${otp}</b>`,
  //     });

  //     // Save OTP in MongoDB
  //     // const otpRecord = new OTPModel({
  //     //   email: email,
  //     //   otp: otp.toString(),
  //     // });

  //     otpRecord
  //       .save()
  //       .then(() => {
  //         res.status(200).json({
  //           message: "OTP sent successfully. Check your email for OTP.",
  //           otp: otp,
  //         });
  //       })
  //       .catch((saveError) => {
  //         console.error("Error saving OTP to MongoDB", saveError);
  //         res
  //           .status(500)
  //           .json({ success: false, message: "Internal Server Error" });
  //       });
  //   } catch (error) {
  //     // console.error(error);
  //     res
  //       .status(500)
  //       .json({ success: false, message: "Internal Server Error" });
  //   }
  // };
  // static sendotp = async (req, res) => {
  //   try {
  //   } catch (err) {}
  // };
  static verifyotp = async (req, res) => {
    try {
      const {
        email,
        otp,
        firstname,
        lastname,
        password,
        mobilenumber,
        alternateNumber,
        address,
      } = req.body;
      // let { ema } = req.body;
      const user1 = await UserModel.findOne({ email: email });
      if (user1) {
        res.status(400).json({
          success: false,
          message: "User already registered!....",
        });
        return;
      }

      // Find the user with the given email and OTP
      // const user = await OTPModel.findOne({ email: email, otp: otp });
      // const user = await OTPModel.findOne({ email: email }).maxTimeMS(10000);
      // console.log("user", user);

      // if (!user) {
      //   res.status(400).json({
      //     success: false,
      //     message: "Invalid OTP. Please check your email.",
      //   });
      //   return;
      // }
      const hashPassword = await bcrypt.hash(password, 10);

      // Check if OTP is expired (2 minutes duration)

      // If OTP is valid, create a new user in your main user collection with additional details
      const newUser = new UserModel({
        email: email,
        otp: otp,
        firstname: firstname,
        lastname: lastname,
        password: hashPassword,
        mobilenumber: mobilenumber,
        alternateNumber: alternateNumber,
        address: address,
      });
      // const newUser = await UserModel.create(d);

      await newUser.save();

      // Optionally, you can remove the OTP record from the OTPModel collection
      // await OTPModel.deleteOne({ email: email, otp: otp });

      res.status(200).json({
        success: true,
        message: "User registered successfully!",
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };

  // static registration = async (req, res) => {
  //   const {
  //     firstname,
  //     lastname,
  //     address,
  //     email,
  //     password,
  //     mobilenumber,
  //     alternatenumber,
  //   } = req.body;
  //   try {
  //     const existinguser = await UserModel.findOne({ email: email });
  //     if (existinguser) {
  //       return res.status(401).json({ message: "Username already exists" });
  //     } else {
  //       const otp = Math.floor(100000 + Math.random() * 900000);

  //       var transport = nodemailer.createTransport({
  //         service: "gmail",
  //         auth: {
  //           user: "jooligupta2000@gmail.com",
  //           pass: "izdmwplsjbdmuiim",
  //         },
  //       });

  //       const info = await transport.sendMail({
  //         from: '"Your Name" <jooligupta2000@gmail.com>', // Update with your name and email
  //         to: email,
  //         subject: "Email Verification OTP",
  //         text: `Your OTP for email verification is: ${otp}`,
  //         html: `<b>Your OTP for email verification is: ${otp}</b>`,
  //       });
  //       transport.sendMail(info, (err, result) => {
  //         if (err) {
  //           console.log("Error");
  //         }
  //       });
  //       const hashPassword = await bcrypt.hash(password, 10);
  //       const data = await UserModel({
  //         firstname,
  //         lastname,
  //         address,
  //         email,
  //         password: hashPassword,
  //         mobilenumber,
  //         alternatenumber,
  //       });
  //       await data.save();
  //       // .then((result) => {
  //       //   verifyotp(result, res);
  //       // })
  //       // .catch((err) => {
  //       //   res.json({ message: "failed" });
  //       // });

  //       const result = await data.save();
  //       res.status(200).json({
  //         status: "success",
  //         //  message: "User registration Successfully!...",
  //         message: "OTP sent successfully. Check your email for OTP.",
  //         result,
  //         otp,
  //       });
  //     }
  //   } catch (err) {
  //     res.status(500).json({ message: "Internal Server Error" + err });
  //   }
  // };

  static forgetpassword = async (req, res) => {
    try {
      const { email } = req.body;
      const otp = Math.floor(100000 + Math.random() * 900000);
      const user = await UserModel.findOneAndUpdate(
        { email },
        { otp },
        { new: true, upsert: true }
      );
      var transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "jooligupta2000@gmail.com",
          pass: "izdmwplsjbdmuiim",
        },
      });
      const info = await transport.sendMail({
        from: '"Your Name" <jooligupta2000@gmail.com>', // Update with your name and email
        to: email,
        subject: "Email Verification OTP",
        text: `Your OTP for email verification is: ${otp}`,
        html: `<b>Your OTP for email verification is: ${otp}</b>`,
      });
      transport.sendMail(info, (err, result) => {
        if (err) {
          console.log("Error");
        }
      });
      res.status(200).json({
        message: "OTP sent successfully. Check your email for OTP.",
        otp: otp,
        email: email,
        userId: user._id,
      });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" + err });
    }
  };
  static resetPassword = async (req, res) => {
    try {
      const { newPassword, confirmpassword } = req.body;
      // const user = await UserModel.findOne({ email: email });
      // if (!user) {
      //   return res.status(500).json({ success: false, message: "Invalid OTP" });
      // }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      newPassword = hashedPassword;
      // user.otp = null;
      // user.passWord = newPassword;
      // user.otp = null;
      if (newPassword === confirmpassword) {
        let x = await user.save();
        console.log(x),
          res
            .status(200)
            .json({ success: true, message: "Password reset successful" });
      } else {
        res
          .status(400)
          .json({ success: true, message: "Password not matched" });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" + err });
    }
  };
  // static forgetpassword = async (req, res) => {
  //   try {
  //   } catch (err) {}
  // };
  // static login = async (req, res) => {
  //   const { email, password } = req.body;
  //   if (email && password) {
  //     const user = await UserModel.findOne({ email: email });
  //     console.log(user);
  //     if (user != null) {
  //       const isMatched = await bcrypt.compare(password, user.password);
  //       if (user.email === email && isMatched) {
  //         res.status(200).json({
  //           message: "Congrulation User sucessfully Login!....",
  //           user,
  //         });
  //       } else {
  //         res.status(500).json({ message: "email and password not match" });
  //       }
  //     } else {
  //       res.status(500).json({ message: "you are not registered user" });
  //     }
  //   } else {
  //     res.status(500).json({ message: "All field are required" });
  //   }
  // };
  static login = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      try {
        const user = await UserModel.findOne({ email: email });
        if (user != null) {
          const isMatched = await bcrypt.compare(password, user.password);
          if (user.email === email && isMatched) {
            // Generate a JWT token
            // const token = jwt.sign(
            //   { userId: user._id, email: user.email },
            //   "your_secret_key",
            //   { expiresIn: "1h" }
            // );
            const token = jwt.sign(
              { userId: user.id },
              process.env.JWT_SECRETE_KEY,
              { expiresIn: "1h" }
            );
            res.cookie("token", token);
            console.log(token);

            res.status(200).json({
              message: "Congratulations! User successfully logged in.",
              user,
              token,
            });
          } else {
            res
              .status(500)
              .json({ message: "Email and password do not match" });
          }
        } else {
          res.status(500).json({ message: "You are not a registered user" });
        }
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    } else {
      res.status(500).json({ message: "All fields are required" });
    }
  };
}
module.exports = AuthController;
