console.log("Hello p5.js!!");

const ID_LOG     = "#my_log";
const ID_VIDEO   = "#my_video";
const ID_CANVAS  = "#my_canvas";
const ID_SHUTTER = "#my_shutter";
 
window.onload = ()=>{
	console.log("onload");
	startCamera();
}

function startCamera(){
	log("Start camera...");

	// Camera API
	navigator.mediaDevices = navigator.mediaDevices || ((navigator.mozGetUserMedia || navigator.webkitGetUserMedia)?{
		getUserMedia: (c)=>{
			return new Promise((y, n)=>{
				(navigator.mozGetUserMedia || navigator.webkitGetUserMedia).call(navigator, c, y, n);
			});
		}
	}:null);

	if(!navigator.mediaDevices){
		log("navigator.mediaDevices not found...");
		return;
	}

	let constraints = {audio: false, video: true};
	navigator.mediaDevices.getUserMedia(constraints)
		.then((stream)=>{
			log("Start straming...");
			let video = document.querySelector(ID_VIDEO);
			video.srcObject = stream;
			video.onloadedmetadata = (e)=>{video.play();};
		}).catch((err)=>{log(err)});

	// Shutter
	$(ID_SHUTTER).on("click", shutter);

	function shutter(){
		log("Shutter!!");
		let video  = $(ID_VIDEO);
		let canvas = $(ID_CANVAS)[0];
		canvas.width  = video.width();
		canvas.height = video.height();
		let context = canvas.getContext("2d");
		context.drawImage(video[0], 0, 0, video.width(), video.height());
		console.log(context);
	}

	function log(str){
		console.log(str);
		$("#my_log").append(str + "<br/>");
	}
}