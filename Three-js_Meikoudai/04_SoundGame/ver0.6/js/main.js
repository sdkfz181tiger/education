console.log("main.js!!");

function setScenery(){
	console.log("setScenery");
	// Trees
	let area = 30;
	for(let i=0; i<50; i++){
		let x = Math.floor(Math.random() * area) - area*0.5;
		let z = Math.floor(Math.random() * area) - area*0.5;
		let scale = 0.1 + 0.1 * Math.random();
		let tree = objLoader.findModels("tree_1.obj", scale);
		tree.position.set(x, 0, z);
		tree.name = "tree_1";
		rootGroup.add(tree);
	}

	let font = fontLoader.findFonts("MisakiGothic");
	let text = fontLoader.createText2D("Hello!!\nWorld!!", font);
	rootGroup.add(text);
}