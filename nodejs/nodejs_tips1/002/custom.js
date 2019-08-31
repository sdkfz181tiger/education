console.log("Hello Node JS!!");

const http = require("http");
const fs   = require("fs");
const ejs  = require("ejs");
const url  = require("url");

// Templates
const tmpIndex = fs.readFileSync("./index.ejs", "utf8");
const tmpCss   = fs.readFileSync("./style.css", "utf8");

// Server
var server = http.createServer(function(req, res){

	var urlParts = url.parse(req.url);

	switch(urlParts.pathname){
		case "/":
			var render = ejs.render(tmpIndex, {
				title: "This is title!!",
				content: "This is content!!"
			});
			res.writeHead(200, {"Content-Type": "text/html"});
			res.write(render);
			res.end();
			break;
		case "/style.css":
			res.writeHead(200, {"Content-Type": "text/css"});
			res.write(tmpCss);
			res.end();
			break;
		default:
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end("No pages...");
			break;
	}
});
server.listen("3030");