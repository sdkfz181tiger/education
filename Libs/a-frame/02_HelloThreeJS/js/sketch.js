//==========
// A-Frame
// -> https://aframe.io/
// Introduction
// -> https://aframe.io/docs/0.8.0/introduction/#
// Examples(Hello Web VR)
// -> https://aframe.io/examples/showcase/helloworld/

console.log("Hello A-Frame!!");

// Log
AFRAME.registerComponent("log",{
	schema: {type: "string"},
	init: function(){
		var str = this.data;
		console.log(str);
	}
});

// Onload
window.onload = function(){
	console.log("onload");
	// Scene
	var sceneEl = document.querySelector("a-scene");
	console.log(sceneEl);

	// Cube
	let size = 500;
	let geometry = new THREE.BoxGeometry(size, size, size);
	let material = new THREE.MeshNormalMaterial();
	let cube = new THREE.Mesh(geometry, material);
	cube.position.set(-1, 0.5, -3);
	sceneEl.add(cube);
}