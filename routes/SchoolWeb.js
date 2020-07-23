const router = require("express").Router();
var Deo = require("../models/Deo");
var Meo = require("../models/Meo");
var Visit = require("../models/Visit");
var Claim = require("../models/Claim");
var School = require("../models/School");
const { v4: uuidv4 } = require("uuid");
const Grievance = require("../models/Grievance");

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

//grievance                                             |url params-> schoolId
router.post("/postgrievance/:schoolId", (req, res) => {
  let reqSchoolName;
  School.findOne({ schoolId: req.params.schoolId })
    .then((d) => {
      reqSchoolName = d.schoolName;
      console.log(reqSchoolName);
      Grievance.findOneAndUpdate(
        { schoolId: req.query.schoolId },
        {
          GrievanceId: uuidv4(),
          title: req.body.title,
          Message: req.body.Message,
          type: req.body.type,
          schoolId: req.query.schoolId,
          schoolName: reqSchoolName,
        },
        {
          new: true,
          upsert: true,
        }
      )
        .then((dd) => {
          res.json(dd);
          console.log(dd);
        })
        .catch((err) => {
          res.send(err);
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.send("unable to find school name");
    });

  // console.log(schoolName);
});
module.exports = router;
