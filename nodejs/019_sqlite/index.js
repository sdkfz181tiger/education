console.log("Hello Node JS!!");

const express = require("express");
const jquery  = require("express-jquery");
const ejs     = require("ejs");
const bParser = require("body-parser");
const sqlite3 = require("sqlite3");

const PORT = 3030;

let app = express();
app.engine("ejs", ejs.renderFile);
app.use(express.static("public"));
app.use(jquery("/jquery"));
app.use(bParser.urlencoded({extended: false}));

let db = new sqlite3.Database("db.sqlite");
let tableName = "users";

//=========
// Root
app.get("/", (req, res)=>{
	let title = "Hello World!!";
	let msg = "Root!!";
	showRows(req, res, title, msg);
});

app.post("/insert", (req, res)=>{
	let title = "Hello World!!";
	let msg = "Insert!!";

	let keys = [];
	let binders = [];
	let obj = {};
	for(key in req.body){
		keys.push(key);
		binders.push("$" + key);
		obj["$" + key] = escapeStr(req.body[key]);
	}
	let sql = "INSERT INTO " + tableName + "(" + keys.join(",") + ") VALUES(" + binders.join(",") + ")";

	// Database
	db.serialize(()=>{
		db.run(sql, obj, (err)=>{
			if(err != false){
				console.log("Inserted!!");
				showRows(req, res, title, msg);
			}else{
				console.log("Error!!");
				console.log(err);
			}
		});
	});
});

app.post("/update", (req, res)=>{
	let title = "Hello World!!";
	let msg = "Update!!";

	let uid = escapeStr(req.body["uid"]);
	let keys = [];
	let binders = [];
	let obj = {};

	let set = [];
	for(key in req.body){
		keys.push(key);
		binders.push("$" + key);
		obj["$" + key] = escapeStr(req.body[key]);
		set.push(key + "='" + escapeStr(req.body[key]) + "'");
	}
	let sql = "UPDATE " + tableName + " SET " + set.join(",") + " WHERE uid = ?";

	// Database
	db.serialize(()=>{
		db.run(sql, uid, (err)=>{
			if(err != false){
				console.log("Updated!!");
				showRows(req, res, title, msg);
			}else{
				console.log("Error!!");
				console.log(err);
			}
		});
	});
});

app.post("/delete", (req, res)=>{
	let title = "Hello World!!";
	let msg = "Delete!!";

	let uid = escapeStr(req.body["uid"]);
	let sql = "DELETE FROM " + tableName + " WHERE uid = ?";

	// Database
	db.serialize(()=>{
		db.run(sql, uid, (err)=>{
			if(err != false){
				console.log("Deleted!!");
				showRows(req, res, title, msg);
			}else{
				console.log("Error!!");
				console.log(err);
			}
		});
	});
});

function showRows(req, res, title, msg){
	let sql = "SELECT * FROM " + tableName;
	// Database
	db.serialize(()=>{
		db.all(sql, (err, rows)=>{
			console.log("Connected!!");
			if(err != false){
				console.log("Success!!");
				res.render("index.ejs",
					{title: title, content: msg, rows: rows});
			}else{
				console.log("Error!!");
				console.log(err);
			}
		});
	});
}

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