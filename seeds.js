var mongoose = require('mongoose');

var Campground = require('./models/campground');
var Comment = require('./models/comment');
var data = [
	{  
		name : "Lion's Heart", 
		image : "https://images.unsplash.com/photo-1567647753830-de3fe7ce9f28?ixlib=rb1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{ 
		name : "Granite Hill", 
		image : "https://images.unsplash.com/photo-1532996078953-a13fa6d622cb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
		desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa ultricies mi quis hendrerit. Nec feugiat nisl pretium fusce id velit ut tortor. Interdum consectetur libero id faucibus nisl tincidunt eget nullam non. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Pellentesque id nibh tortor id aliquet. Varius duis at consectetur lorem. Nunc sed augue lacus viverra vitae congue eu consequat. Donec pretium vulputate sapien nec sagittis. Justo nec ultrices dui sapien eget mi proin sed. Amet aliquam id diam maecenas ultricies mi eget. Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Tristique nulla aliquet enim tortor. Porta nibh venenatis cras sed. Facilisis gravida neque convallis a cras semper auctor. Eros in cursus turpis massa. Aenean sed adipiscing diam donec adipiscing tristique. Velit ut tortor pretium viverra. Facilisis gravida neque convallis a cras semper auctor. Sed augue lacus viverra vitae congue eu consequat. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant. Turpis egestas sed tempus urna et pharetra pharetra massa. Vulputate enim nulla aliquet porttitor lacus. Nunc lobortis mattis aliquam faucibus. Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque."
	},
	{  
		name : "Camp Canooga", 
		image : "https://images.unsplash.com/photo-1501084291732-13b1ba8f0ebc?ixlib=rb1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa ultricies mi quis hendrerit. Nec feugiat nisl pretium fusce id velit ut tortor. Interdum consectetur libero id faucibus nisl tincidunt eget nullam non. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Pellentesque id nibh tortor id aliquet. Varius duis at consectetur lorem. Nunc sed augue lacus viverra vitae congue eu consequat. Donec pretium vulputate sapien nec sagittis. Justo nec ultrices dui sapien eget mi proin sed. Amet aliquam id diam maecenas ultricies mi eget. Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Tristique nulla aliquet enim tortor. Porta nibh venenatis cras sed. Facilisis gravida neque convallis a cras semper auctor. Eros in cursus turpis massa. Aenean sed adipiscing diam donec adipiscing tristique. Velit ut tortor pretium viverra. Facilisis gravida neque convallis a cras semper auctor. Sed augue lacus viverra vitae congue eu consequat. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant. Turpis egestas sed tempus urna et pharetra pharetra massa. Vulputate enim nulla aliquet porttitor lacus. Nunc lobortis mattis aliquam faucibus. Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque."
	},
	{  
		name : "Mount Euphoria", 
		image : "https://images.unsplash.com/photo-1563216368-5b6a40648062?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa ultricies mi quis hendrerit. Nec feugiat nisl pretium fusce id velit ut tortor. Interdum consectetur libero id faucibus nisl tincidunt eget nullam non. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Pellentesque id nibh tortor id aliquet. Varius duis at consectetur lorem. Nunc sed augue lacus viverra vitae congue eu consequat. Donec pretium vulputate sapien nec sagittis. Justo nec ultrices dui sapien eget mi proin sed. Amet aliquam id diam maecenas ultricies mi eget. Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Tristique nulla aliquet enim tortor. Porta nibh venenatis cras sed. Facilisis gravida neque convallis a cras semper auctor. Eros in cursus turpis massa. Aenean sed adipiscing diam donec adipiscing tristique. Velit ut tortor pretium viverra. Facilisis gravida neque convallis a cras semper auctor. Sed augue lacus viverra vitae congue eu consequat. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant. Turpis egestas sed tempus urna et pharetra pharetra massa. Vulputate enim nulla aliquet porttitor lacus. Nunc lobortis mattis aliquam faucibus. Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque."
	},
	{  
		name : "Camp Phospherous", 
		image : "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa ultricies mi quis hendrerit. Nec feugiat nisl pretium fusce id velit ut tortor. Interdum consectetur libero id faucibus nisl tincidunt eget nullam non. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Pellentesque id nibh tortor id aliquet. Varius duis at consectetur lorem. Nunc sed augue lacus viverra vitae congue eu consequat. Donec pretium vulputate sapien nec sagittis. Justo nec ultrices dui sapien eget mi proin sed. Amet aliquam id diam maecenas ultricies mi eget. Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Tristique nulla aliquet enim tortor. Porta nibh venenatis cras sed. Facilisis gravida neque convallis a cras semper auctor. Eros in cursus turpis massa. Aenean sed adipiscing diam donec adipiscing tristique. Velit ut tortor pretium viverra. Facilisis gravida neque convallis a cras semper auctor. Sed augue lacus viverra vitae congue eu consequat. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant. Turpis egestas sed tempus urna et pharetra pharetra massa. Vulputate enim nulla aliquet porttitor lacus. Nunc lobortis mattis aliquam faucibus. Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque."
	}
]


function seedDB(){
	//remove campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		} else {
			console.log("removed campgrounds");
			//add a few campgroudns
			// data.forEach(function(seed){
			// 	Campground.create(seed, function(err, campground){
			// 		if(err){
			// 			console.log(err);
			// 		} else {
			// 			console.log('Campground successfully created');
			// 			Comment.create({
			// 				text: "This place is great I went there last summer with my kids",
			// 				author: "Suzy Whiteness"
			// 			}, function(err, comm){
			// 				if(err){
			// 					console.log(err);
			// 				} else {
			// 					campground.comments.push(comm);
			// 					campground.save();
			// 					console.log("Comment successfullly created>>>>");
			// 				}
			// 			});
			// 		}
			// 	});
			// });
		}
	});

	
	//add a few comments
}

module.exports = seedDB;