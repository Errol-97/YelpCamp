var express= require('express');
var router = express.Router();
var Campground = require("../models/campground");
var middleWare = require("../middleware");//automatically requires from file 'index.js'
//index
router.get("/", function(req, res){
	//get all campgrounds from db
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
	
});
//create
router.post("/", middleWare.isLoggedIn, async (req, res) =>{
	//get data from form and add to campgroudns array
	var name = req.body.name;
	var image = req.body.image;
	var price = req.body.price;
	var desc = req.body.desc;
	var author = {
		id:req.user._id,
		username : req.user.username
	};
	var newCamp = {name: name, image: image, desc:desc, author: author, price: price};
	//create new camp and save to db
	await Campground.create(newCamp, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//redirect to campgrounds page
			res.redirect("/campgrounds"); 
		}
	});
	// campgrounds.push(newCamp);

});
//new
router.get("/new", middleWare.isLoggedIn, function(req, res){
		res.render("campgrounds/new");
});
//show
router.get("/:id", function(req,res){
	//find teh campgound with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground: foundCamp});
		}
	});

	
});
//Edit campground routes
router.get("/:id/edit", middleWare.checkCampAuth, function(req, res){
	Campground.findById(req.params.id, function(err, foundCamp){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.render("campgrounds/edit", {campground: foundCamp});	
		}
	});
});
//update campground routes
router.put("/:id", middleWare.checkCampAuth, function(req, res){
	//find adn update corect camp
	Campground.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updatedCamp){
		if(err){
			console.log(err);
		} else {
			// console.log(req.body.camp);
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

//destroy campground route
router.delete("/:id", middleWare.checkCampAuth, function(req, res){
		Campground.findByIdAndRemove(req.params.id, req.body.camp, function(err, updatedCamp){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;