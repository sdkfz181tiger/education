console.log("Hello Node JS!!");

// How to use "PhantomJS" -> ES2015
// $ phantomjs index.js

var URL = "https://twitter.com/Hiro_Matsuno";
var DIR = "./images/";

var page = require("webpage").create();
page.open(URL, function(status){
	if(status == "success"){
		console.log("Success!!");
		page.render(createFileName());
	}else{
		console.log("Failed...");
	}
	setTimeout(function(){phantom.exit();}, 1000);
});

function createFileName(){
	var date = new Date();
	return DIR + "page" + date.getTime() + ".png";
}