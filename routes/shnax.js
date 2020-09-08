var express = require("express");
var router = express.Router();
var Shnax = require("../models/shnax");
const shnax = require("../models/shnax");
var middleware = require("../middleware/index");

router.get("/shnax", function (req, res) {
  Shnax.find({}, function (err, Shnax) {
    if (err) {
      console.log(err);
    } else {
      res.render("shnax/index", {
        shnax: Shnax,
      });
    }
  });
});
router.post("/shnax", middleware.isLoggedIn, function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.desc;
  var author = {
    id: req.user._id,
    username: req.user.username,
  };
  var newShnax = {
    name: name,
    image: image,
    desc: desc,
    author: author,
  };
  Shnax.create(newShnax, function (err, created) {
    if (err) {
      alert("error");
    } else {
      req.flash("success", "ShnaX Created!");
      res.redirect("/shnax");
    }
  });
});

router.get("/shnax/new", middleware.isLoggedIn, function (req, res) {
  res.render("shnax/new");
});

//show
router.get("/shnax/:id", function (req, res) {
  Shnax.findById(req.params.id)
    .populate("comments")
    .exec(function (err, foundShnax) {
      if (err) {
        console.log(err);
      } else {
        res.render("shnax/show", {
          shnax: foundShnax,
        });
      }
    });
});

//edit route
router.get("/shnax/:id/edit", middleware.checkOwner, function (req, res) {
  Shnax.findById(req.params.id, function (err, foundShnax) {
    res.render("shnax/edit", {
      shnax: foundShnax
    });
  });
});

router.put("/shnax/:id", middleware.checkOwner, function (req, res) {
  //find n updating
  Shnax.findByIdAndUpdate(req.params.id, req.body.shnax, function (
    err,
    updatedC
  ) {
    if (err) {
      res.redirect("/shnax");
    } else {
      req.flash("warning", "Recipie Updated!")
      res.redirect("/shnax/" + updatedC._id);
    }
  });
});
//Destroy or delete route
router.delete("/shnax/:id", middleware.checkOwner, function (req, res) {
  Shnax.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      req.flash("error", "Hey! You can not do that!");
      res.redirect("/shnax");
    } else {
      req.flash("error", "ShnaX Delete!");
      res.redirect("/shnax");
    }
  });
});





module.exports = router;