console.log("Hello Node JS!!");

const ws = require("websocket.io");

const PORT = 3030;

// Server
let server = ws.listen(PORT, ()=>{
	console.log("Start WebSocket server port:" + PORT);
});

server.on("connection", (client)=>{
	// Client
	client.on("message", (e)=>{
		console.log("message:" + e);
		sendAll(e);
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