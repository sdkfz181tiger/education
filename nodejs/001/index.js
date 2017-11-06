console.log("Hello Node JS!!");

const http = require("http");
const fs   = require("fs");
const ejs  = require("ejs");

// Templates
const tmpIndex = fs.readFileSync("./index.ejs",  "utf8");

// Server
var server = http.createServer(function(req, res){
	var render = ejs.render(tmpIndex, {
		title: "This is title!!",
		content: "This is content!!"
	});
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(render);
	res.end();
});
server.listen("3030");