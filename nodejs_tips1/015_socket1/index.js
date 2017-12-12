console.log("Hello Node JS!!");

const ws = require("websocket.io");
const PORT = 3030;
const PREFIX_CLIENT = "client_";
let counter = 0;

// Server
let server = ws.listen(PORT, ()=>{
	console.log("Start WebSocket server port:" + PORT);
});

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