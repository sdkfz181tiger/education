//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

let tm = null;

window.onload = function(){
	console.log("OnLoad");

	// XRUtils
	THREE.WebXRUtils.getDisplays().then((displays)=>{
		// ThreeManager
		tm = new ThreeManager(displays);
		// Raycaster
		tm.setRaycasterListener((intersects)=>{
			for(let target of intersects){
				console.log("distance:" + target.distance + "_" + target.object.name);
			}
		});
	});
}