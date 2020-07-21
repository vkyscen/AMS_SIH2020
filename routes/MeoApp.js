const router = require("express").Router();
var Deo = require("../models/Deo");
var Meo = require("../models/Meo");
var Visit = require("../models/Visit");
var Claim = require("../models/Claim");
var School = require("../models/School");
const { v4: uuidv4 } = require("uuid");

//create new meo
router.post("/newuser", (req, res) => {
  var newMeo = new Meo();
  newMeo.userId = req.body.name;
  newMeo.mId = uuidv4();
  newMeo.dId = "69bd7ffd-e3ea-402a-9577-c2810fb66d46";
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

//login

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

module.exports = router;
