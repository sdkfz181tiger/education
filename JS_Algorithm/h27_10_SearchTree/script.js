console.log("Hello, JavaScript!!");

// H27秋 午後問3
//    2分探索木

window.onload = (event)=>{
	
	let root = new Node(5);
	addNode(2, root);
	addNode(7, root);
	addNode(1, root);
	addNode(8, root);
	addNode(4, root);
	addNode(3, root);
	addNode(12, root);
	removeNode(5, root);
	removeNode(7, root);
	console.log(root);
}

function addNode(v, n){
	if(n == null){
		n = new Node(v);
	}else if(v != n.v){
		if(v < n.v){
			n.l = addNode(v, n.l);
		}else{
			n.r = addNode(v, n.r);
		}
	}
	return n;
}

function removeNode(v, n){
	if(n == null) return n;
	if(v < n.v){
		n.l = removeNode(v, n.l);
	}else if(n.v < v){
		n.r = removeNode(v, n.r);
	}else{
		if(n.l == null && n.r == null){
			n = null;// ノードを削除する
		}else if(n.l == null){
			n = n.r;
		}else if(n.r == null){
			n = n.l;
		}else{
			n.l = extractMaxNode(n.l);// 最大値を除いたノード
			let ext = extractedNode;// 除かれた最大値のノード
			ext.l = n.l;// 左側を接続
			ext.r = n.r;// 右側を接続
			n = ext;
		}
	}
	return n;
}

let extractedNode = null;
function extractMaxNode(n){
	if(n.r == null){
		extractedNode = n;
		n = n.l;
	}else{
		n.r = extractMaxNode(n.r);
	}
	return n;
}

class Node{

	constructor(v){
		this._v = v;
		this._l = null;
		this._r = null;
	}

	get v(){return this._v;}

	get l(){return this._l;}
	get r(){return this._r;}

	set l(n){this._l = n;}
	set r(n){this._r = n;}
}