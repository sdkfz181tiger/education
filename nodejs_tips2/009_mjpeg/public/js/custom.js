console.log("Hello WebCam!!");

const url = "http://192.168.11.23:9090"

//==========
// MJPEG Streamer
$(document).ready(()=>{
	createImageLayer();
});

let counter = 0;
let images  = [];

function createImageLayer(){
	let image = new Image();
	image.onload = imageOnload;
	image.src = url + "/?action=snapshot&n=" + (++counter);
	images.push(image);
}

function imageOnload(){
	while(1 < images.length){
		let del = images.shift();
		del.parentNode.removeChild(del);
	}
	let webcam = document.getElementById("webcam");
	webcam.insertBefore(this, webcam.firstChild);
	setTimeout(()=>{createImageLayer();}, 300);
}