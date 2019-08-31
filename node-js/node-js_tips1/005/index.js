console.log("Hello Node JS!!");

const http = require("http");
const fs   = require("fs");
const ejs  = require("ejs");
const url  = require("url");
const qs   = require("querystring");

// Templates
const fileIndex = fs.readFileSync("./templates/index.ejs", "utf8");
const fileOther = fs.readFileSync("./templates/other.ejs", "utf8");
const fileCss   = fs.readFileSync("./css/style.css", "utf8");

// Server
var server = http.createServer(function(req, res){

	var urlParts = url.parse(req.url, true);

	switch(urlParts.pathname){
		case "/":
			var query = urlParts.query;
			var render = ejs.render(fileIndex, {
				title: "This is title!!",
				content: "This is index!!",
				queryMsg: query.msg
			});
			res.writeHead(200, {"Content-Type": "text/html"});
			res.write(render);
			res.end();
			break;
		case "/other":
			if(req.method == "POST"){
				// Buffer
				var buffer = "";

				// Data
				req.on("data", (data)=>{
					buffer += data;
				});

				// End
				req.on("end", ()=>{
					var post = qs.parse(buffer);
					var query = urlParts.query;
					var render = ejs.render(fileOther, {
						title: "This is title!!",
						content: "This is other!!",
						queryMsg: query.msg,
						postMsg: post.msg
					});
					res.writeHead(200, {"Content-Type": "text/html"});
					res.write(render);
					res.end();
				});
			}else{
				res.writeHead(200, {"Content-Type": "text/html"});
				res.end("No pages...");
			}
			break;
		case "/css/style.css":
			res.writeHead(200, {"Content-Type": "text/css"});
			res.write(fileCss);
			res.end();
			break;
		default:
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end("No pages...");
			break;
	}
});

server.listen("3030");