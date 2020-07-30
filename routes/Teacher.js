const router = require("express").Router();
var Deo = require("../models/Deo");
var Meo = require("../models/Meo");
var Visit = require("../models/Visit");
var School = require("../models/School");
var Question = require("../models/Questions");
var Student = require("../models/Student");
var Teacher = require("../models/Teacher");
const { v4: uuidv4 } = require("uuid");
const Grievance = require("../models/Grievance");

//Create a Teacher
router.post("/newuser/:schoolId", (req, res) => {
  var newTeacher = new Teacher();
  newTeacher.name = req.body.name;
  newTeacher.institute = req.body.institute;
  newTeacher.ph_no = req.body.ph_no;
  newTeacher.schoolId = req.params.schoolId;
  newTeacher.teacherId = uuidv4();
  newTeacher.handling = req.body.handling;
  newTeacher.password = req.body.ph_no;

  newTeacher
    .save()
    .then((d) => {
      res.sendStatus(200);
      console.log(d);
    })
    .catch((err) => console.log(err));
});

//Logging in as a Teacher
router.post("/login", (req, res) => {
  Teacher.findOne({ ph_no: req.body.ph_no, password: req.body.password })
    .then((d) => {
      res.send(d)
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404)
    });
});


//List FeedBacks
router.get("/listfeedbacks/:teacherId", (req, res) => {
  FeedBack.find({ teacherId:req.params.teacherId },"-studentId -teacherId -__v")
    .then((d) => {
          console.log(d);
          res.send(d);
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
});


//Change password
router.post("/changepassword/:teacherId", (req, res) => {
  Teacher.findOneAndUpdate(
    { teacherId: req.params.teacherId },
    { password:req.body.password },
    {upsert: true}
   )
    .then((d) => {
      console.log(d);
      res.json(d);
    })
    .catch((err) => {
      console.log(err);
    });
});




module.exports = router;
