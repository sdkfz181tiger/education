console.log("main.js!!");

function setScenery(){
	console.log("setScenery");
	let font = fontLoader.findFonts("MisakiGothic");

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

	let sCounter = new ScoreCounter(rootGroup, font);
	function test(){
		setTimeout(()=>{
			let num = Math.floor(Math.random() * 100);
			sCounter.update(num);
			test();
		}, 100);
	}
	test();
}

class ScoreCounter{

	constructor(rootNode, font, size=2, padding=2, digits=3){
		this._rootNode = rootNode;
		this._font     = font;
		this._size     = size;
		this._padding  = padding;
		this._digits   = digits;
		this._groups   = [];
		this.init();
	}

	init(){

		let midX = ((this._digits-1)*this._padding)*0.5;
		for(let d=0; d<this._digits; d++){

			let group = new THREE.Group();
			group.position.x = this._padding * d - midX;
			group.position.y = 5;
			group.position.z = 12;
			group.rotation.x = DEG_TO_RAD * -45;
			this._rootNode.add(group);
			this._groups.push(group);

			for(let i=0; i<10; i++){
				let str = "" + i;
				let label = fontLoader.createText2D(str, this._font, this._size);
				group.add(label);
				if(i != 0) label.visible = false;
			}
		}
	}

	update(num){
		let str = String(Math.floor(num)).substr(-this._digits);
		if(str.length < this._digits){
			let pre = "";
			for(let i=0; i<this._digits-str.length; i++) pre += "0";
			str = pre + str;
		}
		for(let d=0; d<this._groups.length; d++){
			let group = this._groups[d];
			for(let i=0; i<group.children.length; i++){
				group.children[i].visible = (i == Number(str[d]));
			}
		}
	}
}