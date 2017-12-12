console.log("Hello Node JS!!");
// You need to prepare server!! -> "node ./000_api_server/index.js"

const http = require("http");

// URL
const apiURL = "http://localhost:3030?name=CameraBig&birth=1970-01-01";

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

req.end();

// Parse
function parseJSON(str){
	let jsonObj = JSON.parse(str);
	console.log(jsonObj);
}
