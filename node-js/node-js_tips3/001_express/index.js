console.log("Hello Node JS!!");

const express = require("express");
const ejs     = require("ejs");
const bParser = require("body-parser");
const sqlite  = require("sqlite3").verbose();

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
	loadData((rows)=>{
		res.render("index_root.ejs", 
			{title: "This is Get!!", msg: msg, rows: rows});
	});
});

// Chat
app.get("/chat", (req, res)=>{
	let msg  = "Chatページです";
	loadData((rows)=>{
		res.render("index_chat.ejs", 
			{title: "This is Get!!", msg: msg, rows: rows});
	});
});

//==========
// Sqlite
function loadData(callback){
	const sql = "SELECT * FROM main";
	let db = new sqlite.Database("db/chat.db");
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

/*
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
	console.log("connection");
	client.id    = PREFIX_CLIENT + counter++;
	client.psw   = getClientPsw();
	client.birth = getClientDate();
	console.log(client.id + ":" + client.psw + " [" + client.birth + "]");

	// Client
	client.on("message", (e)=>{
		let message = '{"id": "' + client.id + '", "msg": ' + e + '}';
		sendAll(message);
	});
	client.on("error", (e)=>{
		console.log("error");
		console.log(e);
	});
	client.on("close", ()=>{
		console.log("close");
	});
});

function sendAll(msg){
	server.clients.forEach(function(client){
		if(client !== null) client.send(msg);
	});
}

function getClientPsw(){
	return "xyz";
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
*/