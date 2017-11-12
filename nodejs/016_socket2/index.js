console.log("Hello Node JS!!");

const express = require("express");
const ejs     = require("ejs");
const bParser = require("body-parser");
const ws = require("websocket.io");

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
	let json = {items:[
		{id: "ex001", psw: "a", birth: "19790213"},
		{id: "ex002", psw: "b", birth: "19800314"},
	]}
	res.render("index_chat.ejs", 
		{title: "This is Get!!", content: msg, data: json});
});

// Socket
app.get("/socket", (req, res)=>{
	let msg  = "WebSocketページです";
	let json = {items:[
		{id: "ex001", psw: "a", birth: "19790213"},
		{id: "ex002", psw: "b", birth: "19800314"},
	]}
	res.render("index_socket.ejs", 
		{title: "This is Get!!", content: msg, data: json});
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
	console.log("connection");
	client.id = PREFIX_CLIENT + counter++;
	console.log("id:" + client.id);

	// Client
	client.on("message", (e)=>{
		let message = '{"id": "' + client.id + '", "text": "' + e + '"}';
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