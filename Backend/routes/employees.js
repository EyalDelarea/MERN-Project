const express = require("express");
const router = express.Router();
const EmployeeSchema = require("../Models/Employee");

router.use(express.json());

//All employees Route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const employees = await EmployeeSchema.find(searchOptions);
    res.send(JSON.stringify(employees));
  } catch (e) {
    res.send("Error", { error: e });
  }
});

//Create employees Route
router.post("/", async (req, res) => {
  const { firstName, lastName, email, role } = req.body;

  const employee = new EmployeeSchema({
    firstName: firstName,
    lastName: lastName,
    email: email,
    role: role,
  });
  try {
    const newGuard = await employee.save();
    res
      .status(201)
      .json({ msg: "New employee has been created :" + newGuard._id });
  } catch (e) {
    res.status(500).json("There was an erorr trying to create the object " + e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteRes = await EmployeeSchema.deleteOne({ _uid: req.body.id });
    if (deleteRes.n === 1) {
      res.status(200).json("Items was sucsessfuly deleted");
    } else {
      res.status(404).json("Couldn't find object to delete");
    }
  } catch (e) {
    res.sendStatus(500).json({
      type: "Internal Error",
      message: e,
    });
  }
});

//update name attribute
router.put("/:id", async (req, res) => {
  try {
    const updatedGuard = await EmployeeSchema.findById(req.body.id);
    updatedGuard.name = req.body.name;
    const saveResponse = await updatedGuard.save();

    res.status(201).json({ msg: "Guard " + req.body.id + " has been updated" });
  } catch (e) {
    res.send(500, "There was an erorr trying to update the object " + e);
  }
});

module.exports = router;
