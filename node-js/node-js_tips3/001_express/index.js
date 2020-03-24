console.log("Hello Node JS!!");

const express = require("express");
const ejs     = require("ejs");
const bParser = require("body-parser");
const sqlite  = require("sqlite3").verbose();
const fs      = require("fs");

const NAME_DB   = "db/chat.db";
const NAME_TBL  = "main";
const NAME_JSON = "public/json/chat.json"

//==========
// App
const PORT_APP = 3030;
let app = express();
app.engine("ejs", ejs.renderFile);
app.use(express.static("public"));
app.use(bParser.urlencoded({extended: false}));
app.listen(PORT_APP, ()=>{
	console.log("Start App server port:" + PORT_APP);
});

// Root
app.get("/", (req, res)=>{

	// Test
	insertData("Guy", "Boo!!");
	
	let msg  = "Rootページです";
	loadData((rows)=>{
		res.render("index_root.ejs", 
			{title: "This is Get!!", msg: msg, rows: rows});
	});
});

// Chat
app.get("/chat", (req, res)=>{

	// Test
	insertData("Guy", "Boo!!");

	let msg  = "Chatページです";
	loadData((rows)=>{
		res.render("index_chat.ejs", 
			{title: "This is Get!!", msg: msg, rows: rows});
	});
});

//==========
// Sqlite
function loadData(callback){
	const sql = "SELECT * FROM " + NAME_TBL;
	let db = new sqlite.Database(NAME_DB);
	db.serialize(()=>{
		db.all(sql, [], (error, rows)=>{
			if(error){
				console.log("Error:" + error);
				return;
			}
			callback(rows);// Callback
		});
	});
	db.close();
}

function insertData(name, text){
	const sql = "INSERT INTO " + NAME_TBL + " VALUES(?,?,?,?)";
	let db = new sqlite.Database(NAME_DB);
	db.serialize(()=>{
		var stmt = db.prepare(sql);
		stmt.run([null, name, text, getClientDate()]);
		stmt.finalize();
		writeJSON();// JSON
	});
	db.close();
}

//==========
// JSON
function writeJSON(){
	loadData((rows)=>{
		const let json = JSON.stringify(rows);
		fs.writeFile(NAME_JSON, json, (error, data)=>{
			if(error) console.log("Error:" + error);
		});
	});
}

function getClientDate(){
	let date = new Date();
	let year = date.getFullYear();
	let mon  = date.getMonth() + 1;
	let day  = date.getDate();
	let hour = date.getHours();
	let min  = date.getMinutes();
	let sec  = date.getSeconds();
	if(mon  < 10) mon  = "0" + mon;
	if(day  < 10) day  = "0" + day;
	if(hour < 10) hour = "0" + hour;
	if(min  < 10) min  = "0" + min;
	if(sec  < 10) sec  = "0" + sec;
	return year + "/" + mon + "/" + day + " " + hour + ":" + min + ":" + sec;
}