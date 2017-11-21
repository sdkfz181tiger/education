console.log("Hello Node JS!!");

const http = require("http");

const HOST = "localhost";
const PORT = "3030"
const PATH = "/";

// JSON
let jsonObj = {
	"name": "DenkiYamada",
	"birth": "1970-01-01"
}

// Options
let data = JSON.stringify(jsonObj);
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
