console.log("Hello Node JS!!");

const http = require("http");

const HOST = "api.openweathermap.org";
const PATH = "/data/2.5/weather";

// JSON
let jsonObj = {
	"q": "Tokyo",
	"appid": "59989d1bbb000897547adda699bbc18f"
}

// Options
let data = JSON.stringify("jsonObj");
let options = {
	host: HOST,
	port: 80,
	path: PATH,
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Content-Length': data.length
	}
};

// URL
const apiURL = "http://api.openweathermap.org/data/2.5/weather?q=Osaka&appid=59989d1bbb000897547adda699bbc18f";

// Request
let req = http.request(apiURL, (res)=>{
	console.log("STATUS: " + res.statusCode);
	console.log("HEADERS: " + JSON.stringify(res.headers));
	res.setEncoding("utf8");
	res.on("data", (chunk)=>{
		parseJSON(chunk);
	});
});

req.on("error", (err)=>{
	console.log(err.message);
});

req.write(data);

req.end();

// Parse
function parseJSON(str){
	let jsonObj = JSON.parse(str);
	console.log(jsonObj);
}
