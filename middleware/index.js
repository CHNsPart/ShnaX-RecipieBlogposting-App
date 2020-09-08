const Shnax = require("../models/shnax");
const Comment = require("../models/comment");
// all middlewares
var middleware = {};

middleware.checkComntOwner = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                //does he own the comment
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You do not have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    } else {
        //if not redirect
        req.flash("error", "Please Login First!");
        res.redirect("back");
    }
}

middleware.checkOwner = function (req, res, next) {
    if (req.isAuthenticated()) {
        Shnax.findById(req.params.id, function (err, foundShnax) {
            if (err) {
                req.flash("error", "Sorry, Recipie not found!")
                res.redirect("back");
            } else {
                //does he own the post
                if (foundShnax.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You do not have permission to do that.")
                    res.redirect("back");
                }
            }
        });
    } else {
        //if not redirect
        req.flash("error", "Please Login First!");
        res.redirect("back");
    }
}

middleware.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/login");
}

module.exports = middleware;