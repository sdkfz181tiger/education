console.log("Hello Node JS!!");

const bParser   = require("body-parser");
const dateUtils = require("date-utils");
const express   = require("express");
const ejs       = require("ejs");
const sqlite3   = require("sqlite3");
const ws        = require("websocket.io");

let db = new sqlite3.Database("db.sqlite");
let tableName = "clients";
cleanData();// SQLite

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
	let msg  = "Rootページです";
	let json = {items:[]}
	res.render("index_root.ejs", 
		{title: "This is Get!!", content: msg, data: json});
});

// Chat
app.get("/chat", (req, res)=>{
	let msg  = "Chatページです";
	let json = {items:[]}
	res.render("index_chat.ejs", 
		{title: "This is Get!!", content: msg, data: json});
});

// Chat
app.get("/json", (req, res)=>{
	selectData(req, res);
});

//==========
// Server
const PORT_SOCKET = 4040;
const PREFIX_CLIENT = "client_";
let counter = 0;
let server = ws.listen(PORT_SOCKET, ()=>{
	console.log("Start WebSocket server port:" + PORT_SOCKET);
});

// Connection
server.on("connection", (client)=>{
	console.log("Connection");
	// Welcome
	client.id = PREFIX_CLIENT + counter++;
	client.created_at = getClientDate();// First time
	console.log("Welcome:" + client.id + ":[" + client.created_at + "]");

	let message = {"x": "240", "y": "160"};
	setTimeout(()=>{sendAll(client, message)}, 500);
	insertData(client, message);// SQLite

	// Client
	client.on("message", (e)=>{
		console.log("Message!!");
		let message = JSON.parse(e);// You can go anywhere
		setTimeout(()=>{sendAll(client, message)}, 100);
		updateData(client, message);// SQLite
	});
	client.on("error", (e)=>{
		console.log("Error!!");
		console.log(e);
	});
	client.on("close", ()=>{
		console.log("Close!!");
		deleteData(client);// SQLite
	});
});

function sendAll(client, message){

	let obj = {
		"id": client.id,
		"created_at": client.created_at,
		"x": message.x,
		"y": message.y
	};
	server.clients.forEach((client)=>{
		if(client !== null) client.send(JSON.stringify(obj));
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

//==========
// Sqlite3
function cleanData(){
	let sql = "DELETE FROM " + tableName;
	// Database
	db.serialize(()=>{
		db.run(sql, (err)=>{
			if(err != false){
				console.log("Cleaned!!");
			}else{
				console.log("Error!!");
				console.log(err);
			}
		});
	});
}

function selectData(req, res){
	let sql = "SELECT * FROM " + tableName;
	// Database
	db.serialize(()=>{
		db.all(sql, (err, rows)=>{
			if(err != false){
				//console.log("Selected!!");
				res.contentType("application/json");
				res.json({"rows" : rows});
			}else{
				console.log("Error!!");
				console.log(err);
			}
		});
	});
}

function insertData(client, message){

	let obj = {
		"id": client.id,
		"created_at": client.created_at,
		"x": message.x,
		"y": message.y
	};

	let keys = [];
	let binders = [];
	let values = [];
	for(key in obj){
		keys.push(key);
		values.push(escapeStr(obj[key]));
		binders.push("?");
	}
	let sql = "INSERT INTO " + tableName + "(" + keys.join(",") + ") VALUES(" + binders.join(",") + ")";

	// Database
	db.serialize(()=>{
		db.run(sql, values, (err)=>{
			if(!err){
				console.log("Inserted:" + client.id);
			}else{
				console.log("Error!!");
				console.log(err);
			}
		});
	});
}

function updateData(client, message){

	let obj = {
		"x": message.x,
		"y": message.y
	};

	let id = client.id;
	let keys = [];
	let binders = [];
	let set = [];
	for(key in obj){
		keys.push(key);
		binders.push("$" + key);
		set.push(key + "='" + escapeStr(obj[key]) + "'");
	}
	let sql = "UPDATE " + tableName + " SET " + set.join(",") + " WHERE id = ?";

	// Database
	db.serialize(()=>{
		db.run(sql, id, (err)=>{
			if(err != false){
				console.log("Updated:" + client.id);
			}else{
				console.log("Error!!");
				console.log(err);
			}
		});
	});
}

function deleteData(client){

	let id = client.id;
	let sql = "DELETE FROM " + tableName + " WHERE id = ?";

	// Database
	db.serialize(()=>{
		db.run(sql, id, (err)=>{
			if(err != false){
				console.log("Deleted:" + client.id);
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
	if(str == "" || str == null || !isNaN(str)) return str;
	return str.replace(/\&/g, '&amp;').
	replace(/</g, '&lt;').replace(/>/g, '&gt;').
	replace(/"/g, '').replace(/'/g, '');
}