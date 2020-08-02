const router = require("express").Router();
var Deo = require("../models/Deo");
var Meo = require("../models/Meo");
var Visit = require("../models/Visit");
var School = require("../models/School");
var Question = require("../models/Questions");
var DistrictData = require("../models/DistrictData");
const { v4: uuidv4 } = require("uuid");
const Grievance = require("../models/Grievance");

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

//Dashboard                                           | url params  -> dId
router.get("/dashboard/:dId", (req, res) => {
  var requestedDeo = req.params.dId;
  School.find({ dId: requestedDeo }, [
    "-userId",
    "-password",
    "-schoolId",
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

//post new or update questions from deo portal
router.post("/postquestions", (req, res) => {
  Question.findOneAndUpdate({ categoryName: req.body.categoryName }, req.body, {
    new: true,
    upsert: true,
  })
    .then((d) => {
      console.log(d);
      res.json(d);
    })
    .catch((err) => {
      console.log(err);
    });
});

//get all the grievances                              | url param -> dId
router.get("/getgrievances/:dId", (req, res) => {
  Grievance.find({ dId: req.params.dId }, "-_id -__v")
    .then((d) => {
      console.log(d);
      res.json(d);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//get all schools list                                | url params -> dId
router.get("/getallschools/:dId", (req, res) => {
  console.log(req.params);
  School.find({ dId: req.params.dId.toString() }, "-password -userId -__v -_id")
    .then((d) => {
      console.log(d);
      res.json(d);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//get all meos in the district                        | url params -> dId
router.get("/getallmeos/:dId", (req, res) => {
  Meo.find({ dId: req.params.dId }, "-_id -password -__v")
    .then((d) => {
      console.log(d);
      res.json(d);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//create a visit
router.post("/createvisit", (req, res) => {
  var uniqueId;
  School.findOne({ schoolId: req.body.schoolId }, "schoolName")
    .then((d) => {
      var newVisit = new Visit();
      newVisit.schoolId = req.body.schoolId;
      newVisit.mId = req.body.mId;
      uniqueId = uuidv4();
      newVisit.visitId = uniqueId;
      newVisit.dId = req.body.dId;
      newVisit.schoolName = d.schoolName;
      newVisit.reportDate = req.body.reportDate;
      newVisit.inaccurateReport = null;
      newVisit.reportData = null;
      newVisit.remarks = null;

      newVisit
        .save()
        .then((dd) => {
          console.log('Visit created',dd);
          res.json(dd);

          
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
    })
    .catch((err) => {
      console.log("error in finding school name");
      console.log('error',err)
      res.send(err);
    });



});

//get all visits for the deo                        | url params -> dId
router.get("/getallvisits/:dId", (req, res) => {
  Visit.find({ dId: req.params.dId }, "-_id -__v")
    .then((d) => {
      console.log(d);
      res.json(d);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//list all questions
router.get("/getallquestions", (req, res) => {
  Question.find({}, "-_id -__v")
    .then((d) => {
      console.log(d);
      res.json(d);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//Changing the status of Grievance or Claimed Feature from the school
router.post("/acceptgrievance/:GrievanceId", (req, res) => {
  Grievance.findOneAndUpdate(
    { GrievanceId: req.params.GrievanceId },
    {
      status: "Completed",
    },
    { upsert: true }
  )
    .then((d) => {
      console.log(d);
      res.send(200);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//Get recent 2 repots of a school                        | url params -> schoolId
router.get("/compareschool/:schoolId", (req, res) => {
  Visit.find({ schoolId: req.params.schoolId, reportData: { $ne: [] } })
    .sort({ reportDate: -1 })
    .then((d) => {
      console.log(d);
      res.json(d);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//temporary reporting route from meo
router.post("/postreport/:visitId", (req, res) => {
  Visit.findOneAndUpdate(
    { visitId: req.params.visitId },
    {
      reportData: req.body.reportData,
      remarks: req.body.remarks,
    },
    { upsert: true }
  )
    .then((d) => {
      console.log(d);
      res.send(200);
    })
    .catch((err) => {
      console.log(err);
    });
});


//Post report
router.post("/postDistrictData", (req, res) => {
  var districtData = new DistrictData();
  districtData.data = req.body.data;

  districtData
    .save()
    .then((d) => {
      res.sendStatus(200);
      console.log(d);
    })
    .catch((err) => console.log(err));
});

//Get the District Wise Report
router.get("/getDistrictWiseReport", (req,res) => {
  DistrictData.find()
  .then((d) => {
      console.log(d);
      res.json(d);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
})


module.exports = router;


