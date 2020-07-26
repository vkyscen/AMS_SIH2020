const router = require("express").Router();
var Deo = require("../models/Deo");
var Meo = require("../models/Meo");
var Visit = require("../models/Visit");
var School = require("../models/School");
var Question = require("../models/Questions");
var LocalQuestions = require("../LocalQuestions");
const { v4: uuidv4 } = require("uuid");

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

//1)list Schools                                        | url params  -> mId
router.get("/tasklist/:mId", (req, res) => {
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

//3)list questions in particular category     	      | url params  -> categoryName
router.get("/getquestions/:categoryName", (req, res) => {
  Question.find({ categoryName: req.params.categoryName }, "-__v")
    .then((d) => {
      console.log(d);
      res.json(d);
    })
    .catch((err) => {
      console.log(err);
      res.send("error occured, check logs for more info");
    });
});

//4) post the vist report from meoApp                 | url params  -> schoolId | body -> reportData(Array)
router.post("/postreport/:schoolId", (req, res) => {
  School.findOne({ schoolId: req.params.schoolId }, "schoolId mId dId")
    .then((d) => {
      console.log(d);
      console.log(".........");
      Visit.findOneAndUpdate(
        { schoolId: d.schoolId },
        {
          schoolId: d.schoolId,
          mId: d.mId,
          dId: d.dId,
          reportId: uuidv4(),
          reportDate: Date.now(),
          reportData: req.body.reportData,
        },
        { upsert: true }
      )
        .then((dd) => {
          console.log(dd);
          res.send("successfully updated.!");
          // res.json(dd);
        })
        .catch((err) => {
          console.log("error in posting visit");
          res.send(err);
        });
    })
    .catch((err) => {
      console.log("error in finding dId");
      res.send(err);
    });
});

//5) get all schools from visit collection              | url params  -> schoolId | body -> reportData(Array)
router.get("/getschools/:mId", (req, res) => {
  Visit.find({ mId: req.params.mId }, "-_id -__v")
    .then((dd) => {
      console.log(dd);
      res.json(dd);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});
// fail safe questions route
router.get("/localquestions", (req, res) => {
  res.json(LocalQuestions);
});

module.exports = router;
