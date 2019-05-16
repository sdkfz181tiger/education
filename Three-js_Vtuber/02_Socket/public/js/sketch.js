console.log("Hello Node JS!!");

// Characters
let jsonObjs = [];

//==========
// WebSocket
let ws = null;

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
	}
	ws.onclose = (e)=>{
		console.log("onClose");
	}
	ws.onerror = (e)=>{
		console.log("onError");
	}

	$(".bShow").click((e)=>{
		let msg = $(e.target).attr("msg");
		if(ws !== null) ws.send(msg);
	});
});