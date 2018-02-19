console.log("Hello Node JS!!");

const express   = require("express");
const jquery    = require("express-jquery");
const ejs       = require("ejs");
const bParser   = require("body-parser");
const validator = require("validator");
const sqlite3   = require("sqlite3");

const PORT = 3030;

let app = express();
app.engine("ejs", ejs.renderFile);
app.use(express.static("public"));
app.use(jquery("/jquery"));
// POST(normal)
app.use(bParser.urlencoded({extended: false}));
// JSON(json)
//app.use(bParser.urlencoded({extended: true}));
//app.use(bParser.json());

let db = new sqlite3.Database("db.sqlite");
let tableName = "users";

//=========
// Root
app.get("/", (req, res)=>{
	let title = "Hello GET!!";
	let msg = "This is GET!!";

	// Escape
	let name = escapeStr(req.query["name"]);
	let birth = escapeStr(req.query["birth"]);
	msg += "[" + name + ", " + birth + "]";

	console.log("GET:" + msg);
	
	res.render("index.ejs",
		{title: title, content: msg});
});

app.post("/", (req, res)=>{
	let title = "Hello POST!!";
	let msg = "This is POST!!";

	// Escape
	let name = escapeStr(req.body["name"]);
	let birth = escapeStr(req.body["birth"]);
	msg += "[" + name + ", " + birth + "]";

	console.log("POST:" + msg);

	res.render("index.ejs",
		{title: title, content: msg});
});

//==========
// Utility
function escapeStr(str){
	return str.replace(/\&/g, '&amp;').
	replace(/</g, '&lt;').replace(/>/g, '&gt;').
	replace(/"/g, '').replace(/'/g, '');
}

//==========
// Listen
app.listen(PORT, ()=>{
	console.log("Start server port:" + PORT);
});