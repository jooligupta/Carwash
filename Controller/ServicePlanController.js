const ServicePlanModel = require("../Models/ServicePlan");
class ServicePlanController {
  static serviceplan = async function (req, res) {
    try {
      const { ServiceType, Amount, CardContent } = req.body;
      const serviceplan = new ServicePlanModel({
        ServiceType,
        Amount,
        CardContent,
      });
      await serviceplan.save();
      res.status(200).json({ serviceplan });
    } catch (error) {
      res.status(400).json({ msg: "Error" });
    }
  };
  // static getserviceplan = async function (req, res) {
  //   try {
  //     const serviceplans = await ServicePlanModel.find({
  //       ServiceType: "Routine clean",
  //     }).select("-_id");
  //     let serviceObject = {};

  //     serviceplans.forEach((serviceplan) => {
  //       serviceObject[serviceplans.uniqueId] = serviceplan;
  //     });

  //     res.status(200).json({ serviceObject });
  //   } catch (error) {
  //     res.status(400).json({ error });
  //   }
  // };

  // static getmemeberplan = async function (req, res) {
  //   try {
  //     let memplan = await ServicePlanModel.find({
  //       ServiceType: "Basic",
  //     }).select("-_id");
  //     let memberObject = {};
  //     memplan.forEach((memplan) => {
  //       memberObject[memplan.uniqueId] = memplan;
  //     });
  //     res.status(200).json({ memberObject });
  //   } catch (error) {
  //     res.status(400).json({ error });
  //   }
  // };
}
module.exports = ServicePlanController;
