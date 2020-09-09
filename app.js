var express = require("express");
var app = express();
var port = 8080 || process.env.PORT;
var mongoose = require("mongoose");
var Shnax = require("./models/shnax");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var flash = require("connect-flash");
var methodOverride = require("method-override");
//seedDB(); //seeding the db

var commentRoutes = require("./routes/comments");
var shnaxRoutes = require("./routes/shnax");
var indexRoutes = require("./routes/index");

//passport config
app.use(
  require("express-session")({
    secret: "CHNsParts secret sentence",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(flash());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  //res.locals.message = req.flash("error");
  res.locals.error = req.flash("error");
  res.locals.warning = req.flash("warning");
  res.locals.success = req.flash("success");

  delete req.session.message;
  next();
});

var bodyParser = require("body-parser");
const {
  request
} = require("express");
const {
  render
} = require("ejs");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
/* var url = process.env.dbURL || "mongodb://localhost/chnscamp" */
mongoose.connect(process.env.dbURL, {
  useNewUrlParser: "true",
  useUnifiedTopology: true,
});

app.use(indexRoutes);
app.use(shnaxRoutes);
app.use(commentRoutes);

app.listen(port, function () {
  console.log("shnaxing Brudaa.......");
});