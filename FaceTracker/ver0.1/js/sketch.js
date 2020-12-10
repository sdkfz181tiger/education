
window.onload = ()=>{
	console.log("onload");

	let cvs = document.getElementById("canvas");
	let ctx = cvs.getContext("2d");

	// Tracker
	let ctrack = new clm.tracker({stopOnConvergence: true});
	ctrack.init();

	let img = new Image();
	img.onload = ()=>{
		ctx.drawImage(img, 0, 0, 540, 720);
		ctrack.start(document.getElementById("canvas"));
	};
	img.src = "./assets/audrey.jpg";

	// Detect if tracker fails to find a face
	document.addEventListener("clmtrackrNotFound", (e)=>{
		ctrack.stop();
		console.log("clmtrackrNotFound...");
	}, false);

	// Detect if tracker loses tracking of face
	document.addEventListener("clmtrackrLost", (e)=>{
		ctrack.stop();
		console.log("clmtrackrLost...");
	}, false);

	// Detect if tracker has converged
	document.addEventListener("clmtrackrConverged", (e)=>{
		ctrack.stop();
		console.log("Converged!!");
		if(ctrack.getCurrentPosition()){
			ctrack.draw(cvs);
		}
	}, false);
}