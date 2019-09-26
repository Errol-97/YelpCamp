var express = require('express'),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	User = require('./models/user'),
	methodOverride = require('method-override'),
	flash = require("connect-flash"),
	passportLocalMongoose = require('passport-local-mongoose');

//seed database
// var seedDB = require("./seeds");

//requiring routes
var commentRoutes = require('./routes/comments'),
	campgroundRoutes = require('./routes/campgrounds'),
	indexRoutes = require('./routes/index');

app.use(flash());

//Passport config
app.use(require("express-session")({
	secret: "Once again Errol is the best creator",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect("mongodb:+srv//webDev:yMIvDZpyqEeAewKw@cluster0-ovcne.mongodb.net/test?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}).then(() => {
	console.log('Connected to DB');
}).catch(err => {
	console.log('ERROR:'+err.message);
});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// seedDB(); //seed the database

app.use(function(req, res, next){
	res.locals.currentUser= req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});





app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("The YelpCamp Server has started");
});

// app.listen(1000, function(){
// 	console.log("The YelpCamp Server has started on port 1000");
// });

// { "_id" : ObjectId("5d79455f1abfef0c1a01b45f"), "name" : "Lion's Heart", "image" : "https://images.unsplash.com/photo-1567647753830-de3fe7ce9f28?ixlib=rb1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9", "__v" : 0 }
// { "_id" : ObjectId("5d79461d0439270cdecf5ef4"), "name" : "Granite Hill", "image" : "https://images.unsplash.com/photo-1532996078953-a13fa6d622cb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcH
// BfaWQiOjF9", "__v" : 0 }
// { "_id" : ObjectId("5d7946a7a8a27d0d70b15453"), "name" : "Camp Canooga", "image" : "https://images.unsplash.com/photo-1501084291732-13b1ba8f0ebc?ixlib=rb1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9", "__v" : 0 }
// { "_id" : ObjectId("5d7947a4946e320f0c871a5a"), "name" : "Mount Euphoria", "image" : "https://images.unsplash.com/photo-1563216368-5b6a40648062?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHB
// faWQiOjF9", "__v" : 0 }
// { "_id" : ObjectId("5d7949a0c28a1a107e5b77e6"), "name" : "Camp Phospherous", "image" : "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9", "__v" : 0 }