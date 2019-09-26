var express= require('express');
var router = express.Router();
var passport = require('passport');
var User = require("../models/user");

//root route
router.get("/", function(req, res){
	res.render("landing");
});
//show register form
router.get("/register", function(req, res){
	res.render("register");
});

//handle signup logic
router.post("/register", function(req,res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "User successfully created! Welcome "+user.username+"!");
			res.redirect("/campgrounds");
		});
	});
});

router.get("/login", function(req, res){
	res.render("login");
	
});

//login logic
//middleware
router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(req, res){
	
});
//logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out");
	res.redirect("back");
	
});
//middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} 
	res.flash("error", "Please login first");
	res.redirect("/login");
}

module.exports = router;