const router = require("express").Router();
var Deo = require("../models/Deo");
var Meo = require("../models/Meo");
var Visit = require("../models/Visit");
var Claim = require("../models/Claim");
var School = require("../models/School");
const { v4: uuidv4 } = require("uuid");

//create new school
router.post("/newuser", (req, res) => {
  var newSchool = new School();
  newSchool.userId = req.body.name;
  newSchool.password = req.body.password;
  newSchool.schoolId = uuidv4();
  newSchool.schoolName = req.body.schoolName;
  newSchool.mandalName = req.body.mandalName;
  newSchool.mId = req.body.mId;

  newSchool
    .save()
    .then((d) => {
      res.sendStatus(200);
      console.log(d);
    })
    .catch((err) => console.log(err));
});

//1)login
router.post("/login", (req, res) => {
  School.findOne({ userId: req.body.name, password: req.body.password })
    .then((d) => {
      if (!d) {
        res.send("incorrect password");
      }
      res.sendStatus(200);
      console.log("logged in successfully");
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
});

//grievance                                             |params-> schoolId
router.post("/grievance", (req, res) => {
  let schoolName = await;
});
module.exports = router;
