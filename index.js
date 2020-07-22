const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
var http = require("http").Server(app);
const morgan = require("morgan");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(morgan("dev"));

//socket
var io = require("socket.io")(http);

//DB stuff
const mongoose = require("mongoose");
const db = require("./setup/myurl").Mongourl;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("mongo connection error " + err));

//server
const server = http.listen(port, () => {
  console.log(`App is running at port ${port}`);
});

//demo route
app.get("/", (req, res) => {
  res.sendStatus(200);
});

//Routes for Deo Web
app.use("/deo", require("./routes/DeoWeb"));
// //Routes for Meo Web
app.use("/meo", require("./routes/MeoApp"));
// //Routes for School Web
app.use("/school", require("./routes/SchoolWeb"));
