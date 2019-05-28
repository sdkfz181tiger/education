console.log("Hello Three.js!!");

let cm = null;

window.onload = function(){
	console.log("OnLoad");

	// ThreeManager
	//  Camera position(PC): pcX, pcY, pcZ
	cm = new CannonManager(0, 60, 90);

	// Animate
	animate();
	function animate(){
		cm.update();// Manager
		requestAnimationFrame(animate);
	};
}