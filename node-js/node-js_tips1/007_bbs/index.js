console.log("Hello Node JS!!");

const http = require("http");
const fs   = require("fs");
const ejs  = require("ejs");
const url  = require("url");
const qs   = require("querystring");

const KEY_COOKIE = "key_cookie";

// Templates
const fileIndex = fs.readFileSync("./templates/index.ejs", "utf8");
const fileOther = fs.readFileSync("./templates/other.ejs", "utf8");
const fileCss   = fs.readFileSync("./css/style.css", "utf8");

// Server
var server = http.createServer(function(req, res){

	var urlParts = url.parse(req.url, true);

	switch(urlParts.pathname){
		case "/":
			// Render
			render(req, res, urlParts, fileIndex, "This is title!!", "index!!");
			break;
		case "/other":
			// Post
			if(req.method == "POST"){
				// Buffer
				var buffer = "";

				// Data
				req.on("data", (data)=>{
					buffer += data;
				});

				// End
				req.on("end", ()=>{
					// Cookie
					var post = qs.parse(buffer);
					setCookie(KEY_COOKIE, post.msg, res);
					// Render
					render(req, res, urlParts, fileOther, "This is title!!", "other!!");
				});
			}else{
				// Render
				render(req, res, urlParts, fileOther, "This is title!!", "other!!");
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

// Render
function render(req, res, urlParts, file, titleMsg, contentMsg){
	// Cookie
	var cookieMsg = getCookie(KEY_COOKIE, req);
	var queryMsg  = urlParts.query.msg;
	var render    = ejs.render(fileIndex, {
		title: titleMsg,
		content: contentMsg,
		cookieMsg: cookieMsg,
		queryMsg: queryMsg
	});
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(render);
	res.end();
}

// Cookie
function setCookie(key, value, res){
	var cookie = escape(value);
	res.setHeader('Set-Cookie', [key + '=' + cookie]);
}

function getCookie(key, req){
	if(req.headers.cookie != undefined){


		var cookie = req.headers.cookie.split(";");
		for(var c in cookie){
			if(cookie[c].trim().startsWith(key + "=")){
				var value = cookie[c].trim().substring(key.length + 1);
				return unescape(value); 
			}
		}
	}
	return "?";
}

server.listen("3030");