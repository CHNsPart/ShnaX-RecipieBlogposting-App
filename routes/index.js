var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function (req, res) {
    res.render("landing");
});

//---------------Auth routes-------------------

//---------------signUp-----------------------
router.get("/register", function (req, res) {
    res.render("register");
});
//---------------signUpLogic-----------------------
router.post("/register", function (req, res) {
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            return req.flash("error", err.message), res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to ShnaX, " + user.username);
            res.redirect("/shnax");
        });
    });
});
//----------------login----------------------
router.get("/login", function (req, res) {
    const success = req.flash("success", "Logged In! Welcome back")
    res.render("login", {
        success
    });
});
/* router.get("/login", function (req, res) {
    req.flash("success", "Logged In! Welcome back")
    res.render("login");
}); */
//---------------Login Logic----------------------
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
            successRedirect: "/shnax",
            failureRedirect: "/login",
            successFlash: true,
            failureFlash: true
        })
        (req, res, next)
});
/* router.post("/login", function(req, res){

} ); */
//---------------Logout Logic---------------------
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Logged Out!")
    res.redirect("/shnax");
});



module.exports = router;