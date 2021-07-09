console.log("Hello, 応用情報技術者試験!!");

// 応用情報_H30秋
//    ウェーブレット木

class Node{

	constructor(s, k){
		this._str = s;
		this._key = k;
		this._left = null;
		this._right = null;
	}

	set str(s){this._str = s;}
	get str(){return this._str;}
	set key(k){this._key = k;}
	get key(){return this._key;}
	set left(n){this._left = n;}
	get left(){return this._key;}
	set right(n){this._right = n;}
	get right(){return this._right;}
}

function rank(root, m, r){

}

// Main
const pattern = {
	A: "00".toString(2),
	C: "01".toString(2),
	G: "10".toString(2),
	T: "11".toString(2)
}

const str = "CTCGAGAGTA";
let bin = "";
for(let i=0; i<str.length; i++){
	const c = str[i];
	bin += pattern[c];
}
console.log("元の文字列:", str);
console.log("2進数文字列:", bin);

// Root
let root = makeNode(str, 0);
makeTree(root, 1);// Make
checkTree(root);// Check
console.log(root);

function makeNode(str, d){
	console.log("makeNode:", str, d);
	let key = "";
	for(let i=0; i<str.length; i++){
		key += pattern[str[i]][d];// TODO: キーの付け方がわからない... 挫折箇所
	}
	return new Node(str, key);
}

function makeTree(node, d){
	console.log("makeTree:", node.str, node.key, d);
	let strL = "";
	let strR = "";
	for(let i=0; i<node.key.length; i++){
		let k = node.key[i];
		if(k == 0){
			strL += node.str[i];
		}else{
			strR += node.str[i];
		}
	}
	let left = makeNode(strL, d);
	node.left = left;
	if(!isOneType(strL)){
		console.log("L:", strL);
		makeTree(left, d+1);
	}
	let right = makeNode(strR, d);
	node.right = right;
	if(!isOneType(strR)){
		console.log("R:", strR);
		makeTree(right, d+1);
	}
}

function checkTree(node){
	console.log("checkTree:", node.key);
	if(node.left != null) checkTree(node.left);
	if(node.right != null) checkTree(node.right);
}

function isOneType(str){
	for(let i=1; i<str.length; i++){
		if(str[0] != str[i]) return false;
	}
	return true;
}



