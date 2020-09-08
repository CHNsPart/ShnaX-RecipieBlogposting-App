var express = require("express");
var router = express.Router();
var Shnax = require("../models/shnax");
var Comment = require("../models/comment");
var middleware = require("../middleware");



//Comments
router.get("/shnax/:id/comments/new", middleware.isLoggedIn, function (req, res) {
    Shnax.findById(req.params.id, function (err, shnax) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {
                shnax: shnax
            });
        }
    });
});

router.post("/shnax/:id/comments", middleware.isLoggedIn, function (req, res) {
    //lookup camp using id
    Shnax.findById(req.params.id, function (err, shnax) {
        if (err) {
            console.log(err);
            res.redirect("/shnax");
        } else {
            //create new commnt
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    res.flash("error", "Something went wrong!, We are on it.")
                    console.log(err);
                } else {
                    //add username and id to commnts
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save cmnts
                    comment.save()
                    shnax.comments.push(comment);
                    shnax.save();
                    //redirect show page
                    req.flash("success", "Comment Added!")
                    res.redirect("/shnax/" + shnax._id);
                }
            });
        }
    });
});
//comments edit

router.get("/shnax/:id/comments/:comment_id/edit", middleware.checkComntOwner, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("warning", "Comment Edited");
            res.render("comments/edit", {
                shnax_id: req.params.id,
                comment: foundComment,
            });
        }
    });
});
//comment update
router.put("/shnax/:id/comments/:comment_id", function (req, res) {
    const id = req.params.id;
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, comment) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("warning", "Comment Edited");
            res.redirect("/shnax/" + id);
        }
    });
});
//delete comment
router.delete("/shnax/:id/comments/:comment_id", middleware.checkComntOwner, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted")
            res.redirect("/shnax/" + req.params.id);
        }
    });
});

module.exports = router;