const router = require("express").Router();
var Deo = require("../models/Deo");
var Meo = require("../models/Meo");
var Visit = require("../models/Visit");
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
  newSchool.schoolAdress = req.body.schoolAdress;
  newSchool.geoHash = req.body.geoHash;
  newSchool.mId = req.body.mId;
  newSchool.dId = req.body.dId;

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
          subject: req.body.subject,
          message: req.body.message,
          schoolId: req.params.schoolId,
          schoolName: reqSchoolName,
          status:"Pending",
          date:Date.now(),          
          dId:d.dId,
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


//Reporting the Inspection Process
router.post("/complaint/:visitId", (req, res) => {

  Visit.findOneAndUpdate(
    { visitId: req.params.visitId },
    {
      inaccurateReport: req.body.inaccurateReport,
    },
    { upsert:true }
    )
    .then((d) => {
      console.log(d)
      res.send(200)
    })
    .catch((err) => {
      console.log(err)
    })
});


//List the grievances of the school
router.get("/getallgrievances/:schoolId", (req, res) => {

  Grievance.find({ schoolId: req.params.schoolId },"date GrievanceId subject message status")
    .then((d) => {
      console.log(d)
      res.send(d)
    })
    .catch((err) => {
      console.log(err)
    })
});

//Getting the school details
router.get("/getdetails/:schoolId", (req, res) => {

  School.find({ schoolId: req.params.schoolId })
    .then((d) => {
      console.log(d)
      res.send(d[0])
    })
    .catch((err) => {
      console.log(err)
    })
});

module.exports = router;

//Graph Section (Recent two reports)
router.get("/plotgraph/:schoolId", (req, res) => {

  Visit.find({ schoolId: req.params.schoolId}).sort({ reportDate: -1})
  .then((d) => {

    var plotData = []
    for(var p=0;p<d.length;p++){
      if (d[p].reportData!=null) {
        plotData.push(d[p])
      }
    }
    if (plotData.length>=2) {
      res.send(plotData.slice(0,2))
    }
    else if(plotData.length==1){
      res.send(plotData[0])
    }
    else{
      res.send([])
    }
  })
  
});