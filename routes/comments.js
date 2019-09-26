// COMMENTS ROUTES
var express= require('express');
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleWare = require("../middleware");//automatically requires from file 'index.js'


//comments new
router.get("/new", middleWare.isLoggedIn, function(req, res){
	//find campuground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});
//comments create
router.post("/", middleWare.isLoggedIn, function(req, res){
	//looking for campground by ID
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", "Prohibited!");
					console.log(err);
				} else {
					//add username and id to comment
					
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();	//save comment

					campground.comments.push(comment);
					campground.save();
					req.flash("success", "New commented successfully created!");
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});
//edit route
router.get("/:comid/edit", middleWare.checkCommentAuth, function(req, res){
	Comment.findById(req.params.comid, function(err, foundComment){
		if(err){
			console.log(err);
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	});
});

//update rotue
router.put("/:comid", middleWare.checkCommentAuth, function(req, res){
	Comment.findByIdAndUpdate(req.params.comid, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/" +req.params.id);
		}
	})
});
//destroy route
router.delete("/:comid", middleWare.checkCommentAuth, function(req, res){
		Comment.findByIdAndRemove(req.params.comid, req.body.comment, function(err, deletedComment){
		if(err){
			res.redirect("/campgrounds/" + req.params.id);
		} else {
			req.flash("success", "Comment successfully deleted!");
			res.redirect("/campgrounds/" + req.params.id);

		}
	});
});




module.exports = router;