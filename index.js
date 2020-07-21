const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
var http = require("http").Server(app);

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
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("mongo connection error " + err));

//server
const server = http.listen(port, () => {
  console.log(`App is running at port ${port}`);
});

//demo route
app.get("/", (re1, res) => {
  res.sendStatus(200);
});
