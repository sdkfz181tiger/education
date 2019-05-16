console.log("Hello Node JS!!");

const PORT_APP    = 3030;
const PORT_SOCKET = 4040;

const express   = require("express");
const ejs       = require("ejs");
const bParser   = require("body-parser");
const http      = require("http");

const WebSocketServer = require("websocket").server;
const WebSocketClient = require("websocket").client;

//==========
// App
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

// JavaScript
app.get("/javascript", (req, res)=>{
	let msg  = "JavaScrptからの接続です";
	let json = {items:[]}
	res.render("index_javascript.ejs", 
		{title: "This is Get!!", content: msg, data: json});
});

// Client
app.get("/client", (req, res)=>{
	let msg  = "Clientからの接続です";
	let json = {items:[]}
	res.render("index_client.ejs", 
		{title: "This is Get!!", content: msg, data: json});

	// WebSocket(Client)
	let wsClient = new WebSocketClient();
	wsClient.connect("ws://localhost:" + PORT_SOCKET + "/");

	wsClient.on("connect", (conn)=>{
		console.log("Client: connected");

		conn.on("message", (msg)=>{
			if(msg.type === "utf8"){
				console.log("Client: message " + msg.utf8Data);
			}
		});

		conn.on("close", ()=>{
			console.log("Client: close " + conn.remoteAddress);
		});

		conn.on("error", (err)=>{
			console.log("Client: error " + err.toString());
		});

		// Test
		setInterval(()=>{
			conn.sendUTF("Client: send to server " + getClientDate());
		}, 3000);
	});

	wsClient.on("connectFailed", (conn)=>{
		console.log("Client: connectFailed");
	});
});

//==========
// WebSocket(Server)
let server = http.createServer((req, res)=>{
	console.log("Server: created " + getClientDate());
	res.writeHead(404); res.end();
});
server.listen(PORT_SOCKET, ()=>{
	console.log("Server: listening");
});

let wsServer = new WebSocketServer({
	httpServer: server,
	// You should not use autoAcceptConnections for production
	// applications, as it defeats all standard cross-origin protection
	// facilities built into the protocol and the browser.  You should
	// *always* verify the connection's origin and decide whether or not
	// to accept it.
	autoAcceptConnections: false
});

wsServer.on("request", (req)=>{

	// Make sure we only accept requests from an allowed origin
	if(!originIsAllowed(req.origin)){
		console.log("Server: rejected " + req.origin);
		req.reject();
		return;
	}

	// Connection
	let conn = req.accept();
	console.log("Server: accepted " + req.origin);
	
	conn.on("message", (msg)=>{
		// UTF-8
		if(msg.type === "utf8"){
			console.log("Server: received(utf8) " + msg.utf8Data);
			conn.sendUTF(msg.utf8Data);// Send(Broadcast)
		}
		// Binary
		if(msg.type === "binary"){
			console.log("Server: received(binary) " + message.binaryData.length + "bytes");
			conn.sendBytes(msg.binaryData);// Send(Broadcast)
		}
	});

	conn.on("close", (reason, desc)=>{
		console.log("Server: closed " + reason + " " + desc);
	});
});

function originIsAllowed(origin){
	// put logic here to detect whether the specified origin is allowed.
	return true;
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