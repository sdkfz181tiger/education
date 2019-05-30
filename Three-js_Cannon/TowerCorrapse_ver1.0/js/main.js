console.log("Hello Three.js!!");

const C_RED    = 0x993333;
const C_ORANGE = 0x996633;
const C_YELLOW = 0x999933;
const C_GREEN  = 0x339933;
const C_AQUA   = 0x336699;
const C_BLUE   = 0x333399;
const C_PURPLE = 0x663399;

let cm = null;

window.onload = function(){
	console.log("OnLoad");

	// ThreeManager
	//  Camera position(PC): pcX, pcY, pcZ
	cm = new CannonManager(0, 60, 90);

	let ground = cm.createPlane("myGround", 0x999999);
	let box1   = cm.createBox("myBox1", 0, 0.5, 0, 3, 0.5, 3, 5, 0xcccccc);

	let sph1 = cm.createSphere("mySph1", +4, 1, 0, 1);
	let sph2 = cm.createSphere("mySph2", +4, 3, 0, 1);
	let sph3 = cm.createSphere("mySph3", +4, 5, 0, 1);
	let sphs = [sph1, sph2, sph3];

	// Tower
	let cyl1 = cm.createCylinder("myCyl1", 0, 1, 0, 1, 1, 1, 10, 5, C_PURPLE);
	let cyl2 = cm.createCylinder("myCyl2", 0, 2, 0, 1, 1, 1, 10, 5, C_BLUE);
	let cyl3 = cm.createCylinder("myCyl3", 0, 3, 0, 1, 1, 1, 10, 5, C_AQUA);
	let cyl4 = cm.createCylinder("myCyl4", 0, 4, 0, 1, 1, 1, 10, 5, C_GREEN);
	let cyl5 = cm.createCylinder("myCyl5", 0, 5, 0, 1, 1, 1, 10, 5, C_YELLOW);
	let cyl6 = cm.createCylinder("myCyl6", 0, 6, 0, 1, 1, 1, 10, 5, C_ORANGE);
	let cyl7 = cm.createCylinder("myCyl7", 0, 7, 0, 1, 1, 1, 10, 5, C_RED);
	let cyls = [cyl1, cyl2, cyl3, cyl4, cyl5, cyl6];

	// Hammer
	let hammer = cm.createBox("myHammer", -5, 3, 0, 0.5, 0.5, 0.5, 5, 0xcccccc)
	hammer.body.type = CANNON.Body.KINEMATIC;
	setTimeout(()=>{
		for(let sph of sphs) sph.body.wakeUp();
		for(let cyl of cyls) cyl.body.wakeUp();
		hammer.body.wakeUp();
		hammer.body.velocity.set(25, 0, 0);
	}, 3000);

	ground.body.addEventListener("collide", (e)=>{
		// console.log(e.contact.bi.material.name);
		// console.log(e.contact.bj.material.name);
	});

	cm.createContact(ground.mat, ground.mat);
	cm.createContact(ground.mat, box1.mat, 0.01, 0);
	cm.createContact(box1.mat, cyl1.mat, 0.01, 0);
	cm.createContact(cyl1.mat, cyl2.mat, 0.01, 0);
	cm.createContact(cyl2.mat, cyl3.mat, 0.01, 0);
	cm.createContact(cyl3.mat, cyl4.mat, 0.01, 0);
	cm.createContact(cyl4.mat, cyl5.mat, 0.01, 0);

	// Animate
	animate();
	function animate(){
		cm.update();// Manager
		requestAnimationFrame(animate);
	};
}