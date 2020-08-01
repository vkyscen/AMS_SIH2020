const router = require("express").Router();
var Deo = require("../models/Deo");
var Meo = require("../models/Meo");
var Visit = require("../models/Visit");
var School = require("../models/School");
var Question = require("../models/Questions");
var Student = require("../models/Student");
var Teacher = require("../models/Teacher");
var FeedBack = require("../models/FeedBack");
const { v4: uuidv4 } = require("uuid");
const Grievance = require("../models/Grievance");

//Create a Student
router.post("/newuser/:schoolId", (req, res) => {
  var newStudent = new Student();
  newStudent.name = req.body.name;
  newStudent.institute = req.body.institute;
  newStudent.position = req.body.position;
  newStudent.dob = req.body.dob;
  newStudent.ph_no = req.body.ph_no;
  newStudent.schoolId = req.params.schoolId;
  newStudent.studentId = uuidv4();
  newStudent.roll_no = req.body.roll_no;
  newStudent.password  = req.body.dob;

  newStudent
    .save()
    .then((d) => {
      res.sendStatus(200);
      console.log(d);
    })
    .catch((err) => console.log(err));
});

//Logging in as a Student
router.post("/login", (req, res) => {
  Student.findOne({ roll_no: req.body.roll_no, password: req.body.password })
    .then((d) => {
      console.log(d)
      res.send(d)
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404)
    });
});

//Send FeedBack
router.post("/sendFeedBack/:studentId", (req, res) => {
  var newFeedBack = new FeedBack();
  newFeedBack.userName = req.body.name;
  newFeedBack.teacherName = req.body.teacherName;
  newFeedBack.subject = req.body.subject;
  newFeedBack.message = req.body.message;
  newFeedBack.rating = req.body.rating;
  newFeedBack.studentId = req.params.studentId;
  newFeedBack.teacherId = req.body.teacherId;
  newFeedBack.position = req.body.position;
  newFeedBack.date = Date.now();

 newFeedBack
    .save()
    .then((d) => {
      res.sendStatus(200);
      console.log(d);
    })
    .catch((err) => console.log(err));

});

//List FeedBacks
router.get("/listfeedbacks/:studentId", (req, res) => {
  FeedBack.find({ studentId:req.params.studentId },"-studentId -teacherId -__v")
    .then((d) => {
          console.log(d);
          res.send(d);
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
});

//Get Profile
router.get("/profile/:studentId", (req, res) => {
  Student.findOne({ studentId:req.params.studentId },"-studentId -schoolId -__v")
    .then((d) => {
          console.log(d);
          res.send(d);
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
});


//List Teachers
router.get("/listteachers/:studentId", (req, res) => {
  Student.findOne({ studentId:req.params.studentId })
  .then((d) => {
      Teacher.find( { $and: [ { schoolId:d.schoolId },{ handling: { $elemMatch: {$eq: d.position }} } ] },"-__v -schoolId" )  
      .then((result) => {
        res.send(result)
      })
      .catch((error) => {
        console.log(err)
        res.send(err)
      })
    })
  .catch((err) => {
    console.log(err);
    res.send([]);
  });
});


//Change password
router.post("/changepassword/:studentId", (req, res) => {
  Student.findOneAndUpdate(
    { studentId: req.params.studentId },
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
