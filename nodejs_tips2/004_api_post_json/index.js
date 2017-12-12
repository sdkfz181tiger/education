console.log("Hello Node JS!!");
// You need to prepare server!! -> "node ./000_api_server/index.js"

const http = require("http");

const HOST = "localhost";
const PORT = "3030"
const PATH = "/";

// Data
let data = JSON.stringify({
	"name": "DenkiYamada",
	"birth": "1970-01-01"
});

// Options
let options = {
	host: HOST,
	port: PORT,
	path: PATH,
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Content-Length': data.length
	}
};

// Request
let req = http.request(options, (res)=>{
	console.log("STATUS: " + res.statusCode);
	console.log("HEADERS: " + JSON.stringify(res.headers));
	res.setEncoding("utf8");
	res.on("data", (chunk)=>{
		let jsonObj = JSON.parse(chunk);
		console.log(jsonObj);
	});
});

req.on("error", (err)=>{
	console.log(err.message);
});

req.write(data);

req.end();