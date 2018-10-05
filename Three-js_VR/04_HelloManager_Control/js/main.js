//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

// Data
const assets = {data:[
	{path:"./models/", mtl:"inv01.mtl", obj:"inv01.obj"},
	{path:"./models/", mtl:"inv02.mtl", obj:"inv02.obj"},
	{path:"./models/", mtl:"inv03.mtl", obj:"inv03.obj"},
]};

window.onload = function(){
	console.log("OnLoad");

	// ThreeManager
	let tm = new ThreeManager();
	tm._renderer.setAnimationLoop(animate);
	tm.startPromise(assets, 
		(results)=>{readyInvaders(results);},
		(error)=>{console.log(error);});

	// Invaders
	let invaders = [];
	
	// Ready
	function readyInvaders(meshes){
		console.log("Ready!!");

		let rows = meshes.length;
		let cols = 8;
		let padding = 50;
		let startX = -padding * (cols-1) * 0.5;
		let startY = 0.0;
		for(let r=0; r<rows; r++){
			for(let c=0; c<cols; c++){
				let x = startX + padding * c;
				let y = startY + padding * r;
				let clone = meshes[r].clone();
				clone.scale.set(3, 3, 3);
				clone.rotation.set(0, Math.PI, 0);
				clone.position.set(x, y, -250);
				invaders.push(clone);
				tm._scene.add(clone);
			}
		}
	}

	// Animate
	function animate(){
		//console.log("Animate");

		// Invaders
		for(invader of invaders){
			invader.rotation.x += 0.001;
			invader.rotation.y += 0.001;
			invader.rotation.z += 0.001;
		}

		// Manager
		tm.animate();
	};
}

