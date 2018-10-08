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
	// Camera position: x, y, z
	// Camera angle: rX, rY, rZ
	let tm = new ThreeManager(0, 10, 50, 0, 0, 0);
	tm._renderer.setAnimationLoop(animate);
	tm.startPromise(assets, 
		(results)=>{onReady(results);},
		(error)=>{onError(error);});

	// Invaders
	let models   = [];
	let invaders = [];

	// Controller
	let state = {
		axes:    [0, 0],       // left/right, down/up (-1.0 -> +1.0)
		buttons: [false, false]// Touchpad, Trigger
	};

	// Ready
	function onReady(meshes){
		console.log("You are ready to start the game!?");
		models = meshes;// All meshes
	}

	// Error
	function onError(error){
		console.log("Something went wrong...");
		console.log(error);
	}

	function helloInvader(){
		console.log("helloInvader!!");

		if(models.length <= 0) return;

		let area = 20;
		let x = Math.floor(Math.random() * area) - area*0.5;
		let y = Math.floor(Math.random() * area);
		let z = Math.floor(Math.random() * area) - area*0.5;
		let index = Math.floor(Math.random() * models.length);
		let clone = models[index].clone();
		clone.scale.set(0.4, 0.4, 0.4);
		clone.rotation.set(0, Math.PI, 0);
		clone.position.set(x, y, z);
		invaders.push(clone);
		tm._scene.add(clone);

		// Label
		let str = "[" + x + ", " + y + ", " + z + "]";
		clone.add(tm.createLabel(str));
	}

	// Animate
	function animate(){
		//console.log("Animate");

		// Invaders
		for(invader of invaders){
			//invader.rotation.x += 0.005;
			invader.rotation.y += 0.015;
			//invader.rotation.z += 0.005;
		}

		let gamePad = navigator.getGamepads()[0];
		if(gamePad && gamePad.id === "Oculus Go Controller"){
			//console.log("This is Oculus Go!!");

			let axes    = gamePad.axes;
			let buttons = gamePad.buttons;
			let pose    = gamePad.pose;
			let angularAcceleration = pose.angularAcceleration;
			let angularVelocity     = pose.angularVelocity;
			let linearAcceleration  = pose.linearAcceleration;
			let linearVelocity      = pose.linearVelocity;
			let orientation         = pose.orientation;

			// Buttons
			if(state.buttons[0] != buttons[0].pressed){
				state.buttons[0] = buttons[0].pressed;
				if(buttons[0].pressed){
					console.log("Touchpad has pressed!!");

					let theta = Math.atan2(state.axes[1], state.axes[0]);
					console.log(theta);

					helloInvader();
				}else{
					console.log("Touchpad has released!!");
				}
			}

			if(state.buttons[1] != buttons[1].pressed){
				state.buttons[1] = buttons[1].pressed;
				if(buttons[1].pressed){
					console.log("Trigger has pressed!!");
					helloInvader();
				}else{
					console.log("Trigger has released!!");
				}
			}
		}

		// Manager
		tm.animate();
	};
}

