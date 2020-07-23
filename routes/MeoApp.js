const router = require("express").Router();
var Deo = require("../models/Deo");
var Meo = require("../models/Meo");
var Visit = require("../models/Visit");
var Claim = require("../models/Claim");
var School = require("../models/School");
var Question = require("../models/Questions");
var LocalQuestions = require("../LocalQuestions");
const { v4: uuidv4 } = require("uuid");
const { response } = require("express");

//create new meo
router.post("/newuser", (req, res) => {
  var newMeo = new Meo();
  newMeo.userId = req.body.name;
  newMeo.mId = uuidv4();
  newMeo.dId = req.body.dId;
  newMeo.password = req.body.password;
  newMeo.mandalName = req.body.mandalName;

  newMeo
    .save()
    .then((d) => {
      res.sendStatus(200);
      console.log(d);
    })
    .catch((err) => console.log(err));
});

//login                                                 | body  -> name,password
router.post("/login", (req, res) => {
  Meo.findOne({ userId: req.body.name, password: req.body.password })
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

//1)list Schools                                        | params  -> mId
router.get("/tasklist", (req, res) => {
  var requestedMeo = req.query.mId;
  School.find({ mId: requestedMeo }, [
    "-userId",
    "-password",
    "-schoolId",
    "-mId",
    "-dId",
    "-__v",
    "-_id",
  ])
    .then((d) => {
      console.log(d);
      res.json(d);
    })
    .catch((err) => console.log(err));
});

//2)list categories
router.get("/getcategories", (req, res) => {
  Question.find({}, "categoryName")
    .then((d) => {
      console.log(d);
      res.json(d);
    })
    .catch((err) => {
      console.log(err);
      res.send("error occured, chck logs for more info");
    });
});

//3)list questions in particular category     	      | params  -> categoryName
router.get("/getquestions", (req, res) => {
  Question.find({ categoryName: req.query.categoryName }, "-__v")
    .then((d) => {
      console.log(d);
      res.json(d);
    })
    .catch((err) => {
      console.log(err);
      res.send("error occured, chck logs for more info");
    });
});
// fail safe questions route
router.get("/localquestions", (req, res) => {
  res.json(LocalQuestions);
});

module.exports = router;
