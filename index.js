const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const express = require("express");
const mongooese = require("mongoose");
///////////////////////////////////////////////////////

// app -> express part
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
///////////////////////////////////////////////////////
// database part

mongooese.connect("mongodb://localhost:27017/eventor_admin", {
  useNewUrlParser: true, useUnifiedTopology: true
});

const adminSchema = new mongooese.Schema({
  username: String,
  password: String,
  adminCode: Number,
});

const Admin = mongooese.model("Admin", adminSchema);

const admin = new Admin({
  username: "tannatsri",
  password: "tanqwer",
  adminCode: 1,
});

const eventSchema = new mongooese.Schema({
  clubName: String,
  eventName: String,
  startDate: Date,
  endDate: Date,
  startTime: String,
  endTime: String,
  descrpition: String,
  link: String,
});

const Event = mongooese.model("Eventor", eventSchema);


// **********************************************************************************************************************
////////////////////////////////////////////////////
// routes part
app.get("/", (req, res) => {
  // res.sendFile(__dirname +  '/public/home.html');
  res.render(__dirname + "/public/home");
});

app.get("/login", (req, res) => {
  res.render(__dirname + "/public/login");
});

app.post("/admin", (req, res) => {
  // res.render(__dirname + "/public/admin1");

  Admin.find(
    { username: req.body.username, password: req.body.password },
    function (err, admins) {
      mongooese.connection.close();
      if (err) {
        console.log("error");
        res.redirect("/login");
      }
      else {
        if (admins.length === 0) {
          res.redirect("/login");
        }
        else {
          // res.render(__dirname + "/public/admin1");
          console.log(admins);
          if (admins[0].adminCode === 1) {
            res.render(__dirname + "/public/admin1");
          } else res.send("<h1< Admin type 2");
        }
      }
    }
  );
});

app.get("/admin", (req, res) => {
  res.render(__dirname + "/public/admin1");
})

function addEvent(details) {



  const event = new Event({
    clubName: details.body.organiser,
    eventName: details.body.event_name,
    startDate: details.body.st_date,
    endDate: details.body.end_date,
    startTime: details.body.st_time,
    endTime: details.body.end_time,
    descrpition: details.body.description,
    link: details.body.link
  });
  console.log("******************************");
  console.log(event);

  event.save(function (err) {
    if (err) console.log(err);
  });
  // mongooese.connection.close();





}
app.post("/add-event", (req, res) => {
  addEvent(req);
  // console.log(req);
  res.redirect(req.headers.referer);
})
app.post("/delete-event", (req, res) => {
  console.log(req.body);
  res.send("<h1> Event Deleted </h1>");
})

app.listen(3000);
