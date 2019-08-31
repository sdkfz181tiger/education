console.log("Hello Node JS!!");

const express   = require("express");
const jquery    = require("express-jquery");
const ejs       = require("ejs");
const bParser   = require("body-parser");
const ws        = require("websocket.io");
const validator = require("validator");
const sqlite3   = require("sqlite3");

//==========
// PORT
const PORT_SOCKET_CLIENT = 4040;
const PORT_SOCKET_SERVER = 5050;

//==========
// CLIENT
let app = express();
app.engine("ejs", ejs.renderFile);
app.use(express.static("public"));
app.use(bParser.urlencoded({extended: false}));
app.listen(PORT_SOCKET_CLIENT, ()=>{
	console.log("Start App server port:" + PORT_SOCKET_CLIENT);
});

// Root
app.get("/", (req, res)=>{
	let msg  = "Clientページです";
	let json = {items:[]}
	res.render("index_socket_client.ejs", 
		{title: "Hello Socket!!", content: msg, data: json});
});

//==========
// Server
let counter = 0;
let server = ws.listen(PORT_SOCKET_SERVER, ()=>{
	console.log("Start WebSocket server port:" + PORT_SOCKET_SERVER);
});

// Connection
server.on("connection", (client)=>{
	console.log("connection");
	client.name  = "user_" + counter++;

	let data = {
		"name" : client.name, "birth": getClientDate(),
		"text" : "Nice to meet you!!",
		"posX" : "0", "posY" : "0"
	};
	isExistsDB(data, (flg)=>{
		if(flg == false){
			insertDB(data);
		}else{
			updateDB(data);
		}
	});

	// Client
	client.on("message", (e)=>{
		let obj = JSON.parse(e);
		let data = {
			"name" : client.name, "birth": getClientDate(),
			"text" : obj.text,
			"posX" : obj.posX, "posY" : obj.posY
		};
		updateDB(data);
		sendAll(data);
	});
	client.on("error", (e)=>{
		console.log("error");
		console.log(e);
	});
	client.on("close", ()=>{
		console.log("close");
		let data = {
			"name" : client.name
		};
		deleteDB(data);
	});
});

function sendAll(data){
	server.clients.forEach(function(client){
		let str = JSON.stringify(data);
		if(client !== null) client.send(str);
	});
}

//==========
// Utilities
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
// Database
let db = new sqlite3.Database("db.sqlite");
let tableName = "users";

function insertDB(data){
	// Insert
	let name = escapeStr(data["name"]);
	let keys = [];
	let binders = [];
	let obj = {};
	for(key in data){
		keys.push(key);
		binders.push("$" + key);
		obj["$" + key] = escapeStr(data[key]);
	}
	let sql = "INSERT INTO " + tableName + "(" + keys.join(",") + ") VALUES(" + binders.join(",") + ")";
	// Database
	db.serialize(()=>{
		db.run(sql, obj, (err)=>{
			if(err != false){
				console.log("Inserted:" + name);
			}else{
				console.log("Error!!");
				console.log(err);
			}
		});
	});
}

function updateDB(data){
	// Update
	let name = escapeStr(data["name"]);
	let keys = [];
	let binders = [];
	let obj = {};

	let set = [];
	for(key in data){
		keys.push(key);
		binders.push("$" + key);
		obj["$" + key] = escapeStr(data[key]);
		set.push(key + "='" + escapeStr(data[key]) + "'");
	}
	let sql = "UPDATE " + tableName + " SET " + set.join(",") + " WHERE name = ?";

	// Database
	db.serialize(()=>{
		db.run(sql, name, (err)=>{
			if(err != false){
				console.log("Updated:" + name);
			}else{
				console.log("Error!!");
				console.log(err);
			}
		});
	});
}

function deleteDB(data){
	// Delete
	let name = escapeStr(data["name"]);
	let sql = "DELETE FROM " + tableName + " WHERE name = ?";
	// Database
	db.serialize(()=>{
		db.run(sql, name, (err)=>{
			if(err != false){
				console.log("Deleted:" + name);
			}else{
				console.log("Error!!");
				console.log(err);
			}
		});
	});
}

function isExistsDB(data, callback){
	// Exists
	let name = escapeStr(data["name"]);
	let sql = "SELECT * FROM " + tableName + " WHERE name = '" + name + "'";
	// Database
	db.serialize(()=>{
		db.all(sql, (err, rows)=>{
			if(err != false){
				console.log("Exists[" + rows.length + "]:" + name);
				if(0 < rows.length){
					return callback(true);
				}else{
					return callback(false);
				}
			}else{
				console.log("Error!!");
				console.log(err);
				callback(false);
			}
		});
	});
}

function escapeStr(str){
	return str.replace(/\&/g, '&amp;').
	replace(/</g, '&lt;').replace(/>/g, '&gt;').
	replace(/"/g, '').replace(/'/g, '');
}