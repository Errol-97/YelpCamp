var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCommentAuth = function checkAuth(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comid, function(err, foundComment){
			if(err){
				req.flash("error", "No comment exists with this id exists.");
				res.redirect("back");
			} else {
				//if current user owns current campground
				if(foundComment.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You don't have the priveleges to modify this comment ");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You have to first login to have access to this action.");	
		res.redirect("back");
	}
}

middlewareObj.checkCampAuth = function checkCampAuth(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCamp){
			if(err){
				req.flash("error", "No campground with this id exists.");
				res.redirect("/campgrounds");
			} else {
				//if current user owns current campground
				if(foundCamp.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "Current ownership priveleges won't allow you to create/modify this record.");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to login to have access!");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} 
	req.flash("error", "You first need to login for access");
	res.redirect("/login");
}


module.exports = middlewareObj;