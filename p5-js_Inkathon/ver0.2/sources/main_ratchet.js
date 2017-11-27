//==========
// Ratchet
var socket;

// MESSAGE
const MSG_DELIMITER             = ":";
const OTHER_DELIMITER           = ",";
const DONE_DELIMITER            = ",";
const TALK_DELIMITER            = ",";
const CONNECTION_ONLINE         = "connection_online";
const CONNECTION_OFFLINE        = "connection_offline";
const CONNECTION_CODE           = "connection_code";

const CONNECTION_CONTROL_UP     = "connection_control_up";
const CONNECTION_CONTROL_DOWN   = "connection_control_down";
const CONNECTION_CONTROL_LEFT   = "connection_control_left";
const CONNECTION_CONTROL_RIGHT  = "connection_control_right";
const CONNECTION_CONTROL_A      = "connection_control_a";
const CONNECTION_CONTROL_B      = "connection_control_b";
const CONNECTION_CONTROL_C      = "connection_control_c";
const CONNECTION_CONTROL_D      = "connection_control_d";
const CONNECTION_CONTROL_OPTION = "connection_control_option";
const CONNECTION_CONTROL_OTHER  = "connection_control_other";
const CONNECTION_CONTROL_DONE   = "connection_control_done";
const CONNECTION_CONTROL_TALK   = "connection_control_talk";

const QUEST_BORN                = "quest_born";
const QUEST_DIE                 = "quest_die";
const QUEST_DAMAGE              = "quest_damage";
const QUEST_EQUIP               = "quest_equip";

// Socket(Open)
function clientOpen(){

	// Socket
	var socket = new WebSocket("ws://" + window.location.hostname + ":8000");

	// onOpen
	socket.onopen = function(e){
		console.log("onOpen");
		
		// Status
		if(socket != null) statusOnline();
	}

	// onMessage
	socket.onmessage = function(e){
		var comment = JSON.parse(e.data);
		//console.log("onMessage:" + comment.message);
		var message = comment.message;

		// Message
		var messages = message.split(MSG_DELIMITER);
		var type = messages[0];
		var str = messages[1];
		if(type == CONNECTION_ONLINE){
			msgConnectionOnline(str);
		}else if(type == CONNECTION_OFFLINE){
			msgConnectionOffline(str);
		}else if(type == CONNECTION_CODE){
			msgConnectionCode(str);
		}

		if(type == CONNECTION_CONTROL_UP){
			msgConnectionControlUp(str);
		}else if(type == CONNECTION_CONTROL_DOWN){
			msgConnectionControlDown(str);
		}else if(type == CONNECTION_CONTROL_LEFT){
			msgConnectionControlLeft(str);
		}else if(type == CONNECTION_CONTROL_RIGHT){
			msgConnectionControlRight(str);
		}else if(type == CONNECTION_CONTROL_A){
			msgConnectionControlA(str);
		}else if(type == CONNECTION_CONTROL_B){
			msgConnectionControlB(str);
		}else if(type == CONNECTION_CONTROL_C){
			msgConnectionControlC(str);
		}else if(type == CONNECTION_CONTROL_D){
			msgConnectionControlD(str);
		}else if(type == CONNECTION_CONTROL_OPTION){
			msgConnectionControlOption(str);
		}else if(type == CONNECTION_CONTROL_OTHER){
			var strs = str.split(OTHER_DELIMITER);
			msgConnectionControlOther(strs);
		}

		if(type == CONNECTION_CONTROL_DONE){
			var strs = str.split(DONE_DELIMITER);
			msgConnectionControlDone(strs);
		}

		if(type == CONNECTION_CONTROL_TALK){
			var strs = str.split(TALK_DELIMITER);
			msgConnectionControlTalk(strs);
		}
	}

	// onClose
	socket.onclose = function(e){
		console.log("onClose");
	}

	// onError
	socket.onerror = function(e){
		console.log("onError");
	}

	return socket;
}

window.onbeforeunload = function(){

	// Status
	if(socket != null) statusOffline();

	//==========
	// Ratchet
	clientClose();
	return false;
}

// Socket(Close)
function clientClose(){
	console.log("clientClose");

	// Close
	if(socket != null) socket.close(1000, "Window closed");
}

//==========
// PlayerName
function getUserName(){
	// UserName
	var userName = "";
	$("#playerInfo").find("username").each(function(e){
		userName += $(this).text();
	});
	return userName;
}