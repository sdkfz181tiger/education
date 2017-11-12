console.log("Hello Node JS!!");

//==========
// WebSocket
let ws;

// Load
$(window).on("load", ()=>{
	console.log("Load!!");

	// Initialize
	ws = new WebSocket("ws://localhost:4040");
	ws.onopen = (e)=>{
		console.log("onOpen");
	}
	ws.onmessage = (e)=>{
		console.log("onMessage:" + e.data);
		let jsonObj = JSON.parse(e.data);
		appendMessage(jsonObj);
	}
	ws.onclose = (e)=>{
		console.log("onClose");
	}
	ws.onerror = (e)=>{
		console.log("onError");
	}
});

// Unload
$(window).on("unload", ()=>{
	console.log("Unload!!");
	ws.close();
});

// Ready
$(document).ready(()=>{
	console.log("Ready!!");
	// UI
	$("#myBtn").on("click", (e)=>{
		// Send massage
		let msg = escapeStr($("#myInput").val());
		if(ws !== null) ws.send(msg);
	});
});

// Escape
function escapeStr(str){
	return str.replace(/\&/g, '&amp;').
	replace(/</g, '&lt;').replace(/>/g, '&gt;').
	replace(/"/g, '').replace(/'/g, '');
}

function appendMessage(jsonObj){
	// Append
	let id = jsonObj.id;
	let text = jsonObj.text;
	let tag = "<tr><th>" + id + "</th><td>" + text + "</td></tr>";
	$("#myTable").append(tag);
}