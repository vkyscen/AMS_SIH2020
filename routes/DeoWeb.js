const router = require("express").Router();
var Deo = require("../models/Deo");
var Meo = require("../models/Meo");
var Visit = require("../models/Visit");
var Claim = require("../models/Claim");
var School = require("../models/School");
var Question = require("../models/Questions");
const { v4: uuidv4 } = require("uuid");

//register a new deo
router.post("/newuser", (req, res) => {
  var newDeo = new Deo();
  newDeo.userId = req.body.name;
  newDeo.dId = uuidv4();
  newDeo.password = req.body.password;
  newDeo.districtName = req.body.districtName;

  newDeo
    .save()
    .then((d) => {
      res.sendStatus(200);
      console.log(d);
    })
    .catch((err) => console.log(err));
});

//login
router.post("/login", (req, res) => {
  Deo.findOne({ userId: req.body.name, password: req.body.password })
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

//post new or update questions from deo portal
router.post("/postquestions", (req, res) => {
  // console.log(req.body);
  Question.findOneAndUpdate({ categoryName: req.body.categoryName }, req.body, {
    new: true,
    upsert: true, // Make this update into an upsert
  })
    .then((d) => {
      console.log(d);
      // res.sendStatus(200);
      res.json(d);
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;