//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

// Data
const assets = {data:[
	{path:"./models/", mtl:"inv01.mtl", obj:"inv01.obj"},
	{path:"./models/", mtl:"inv02.mtl", obj:"inv02.obj"},
	{path:"./models/", mtl:"inv03.mtl", obj:"inv03.obj"},
	{path:"./models/", mtl:"inv04.mtl", obj:"inv04.obj"},
]};

window.onload = function(){
	console.log("OnLoad");

	// ThreeManager
	// VR mode: true/false
	// Camera position: x, y, z
	// Camera angle: rX, rY, rZ
	let tm = new ThreeManager(true, 0, 10, 50, 0, 0, 0);
	tm._renderer.setAnimationLoop(animate);
	tm.startPromise(assets, 
		(results)=>{onReady(results);},
		(error)=>{onError(error);});

	// Invaders
	let invaders = [];

	// Ready
	function onReady(meshes){
		console.log("You are ready to start the game!?");

		let gamePads = window.navigator.getGamepads();
		Array.prototype.forEach.call(gamePads, (activePad, padIndex)=>{
			if(activePad.connected){
				console.log("GamePad!!");
				helloInvader(meshes);
			}
		});

		//showInvaders(meshes);
		helloInvader(meshes);

		/*
		Array.prototype.forEach.call(navigator.getGamepads(), (activePad, padIndex)=>{
			if(activePad.connected){
				console.log("GamePad!!");
				if(activePad.id.includes("Gear VR")){
					activePad.buttons.forEach((gamepadButton, buttonIndex)=>{
						if(buttonIndex === 0 && gamepadButton.pressed && !lastButtons[buttonIndex]){
							helloInvader(meshes);
						}
						state.lastButtons[buttonIndex] = gamepadButton.pressed;
					});
				}
			}
		});
		*/
	}

	// Error
	function onError(error){
		console.log("Something went wrong...");
		console.log(error);
	}

	// Show
	function showInvaders(meshes){
		console.log("showInvaders!!");

		let rows = meshes.length;
		let cols = 8;
		let padding = 6;
		let startX = -padding * (cols-1) * 0.5;
		let startY = 0.0;
		for(let r=0; r<rows; r++){
			for(let c=0; c<cols; c++){
				let x = startX + padding * c;
				let y = startY + padding * r;
				let clone = meshes[r].clone();
				clone.scale.set(0.4, 0.4, 0.4);
				clone.rotation.set(0, Math.PI, 0);
				clone.position.set(x, y, 0);
				invaders.push(clone);
				tm._scene.add(clone);
			}
		}
	}

	function helloInvader(meshes){
		console.log("helloInvader!!");

		let area = 20;
		let x = Math.floor(Math.random() * area) - area*0.5;
		let y = Math.floor(Math.random() * area);
		let z = Math.floor(Math.random() * area) - area*0.5;
		let index = Math.floor(Math.random() * meshes.length);
		let clone = meshes[index].clone();
		clone.scale.set(0.4, 0.4, 0.4);
		clone.rotation.set(0, Math.PI, 0);
		clone.position.set(x, y, z);
		invaders.push(clone);
		tm._scene.add(clone);

		// Label
		let str = "[" + x + ", " + y + ", " + z + "]";
		clone.add(tm.createLabel(str));
	}

	let state = {
		lastButtons: {},
		lastAxes: {}
	};

	// Animate
	function animate(){
		//console.log("Animate");

		// Invaders
		for(invader of invaders){
			//invader.rotation.x += 0.005;
			invader.rotation.y += 0.015;
			//invader.rotation.z += 0.005;
		}

		/*
		Array.prototype.forEach.call(navigator.getGamepads(), (activePad, padIndex)=>{
			if(activePad.connected){
				console.log("GamePad!!");
				if(activePad.id.includes("Gear VR")){
					activePad.buttons.forEach((gamepadButton, buttonIndex)=>{
						if(buttonIndex === 0 && gamepadButton.pressed && !lastButtons[buttonIndex]){
							helloInvader(meshes);
						}
						state.lastButtons[buttonIndex] = gamepadButton.pressed;
					});
				}
			}
		});
		*/

		// Manager
		tm.animate();
	};
}

