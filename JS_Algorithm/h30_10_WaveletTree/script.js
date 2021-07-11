console.log("Hello, 応用情報技術者試験!!");

// 応用情報_H30秋
//    ウェーブレット木(改造)

// 2進数のパターン
const PATTERN = {
	A: "00".toString(2),
	C: "01".toString(2),
	G: "10".toString(2),
	T: "11".toString(2)
}

const LEN = Math.log2(Object.keys(PATTERN).length);

window.onload = (event)=>{

	// 文字列を2進数に変換する
	const str = "CTCGAGAGTA";
	let bin = "";
	for(let i=0; i<str.length; i++){
		const c = str[i];
		bin += PATTERN[c];
	}
	console.log("文字列:", str);
	console.log("2進数:", bin);

	// ウェーブレット木
	let root = makeNode(str, 0);// ルート
	makeTree(root, 1);// ウェーブレット木を作る
	checkTree(root);  // ウェーブレット木を確認する

	// 文字数をカウントする
	rank(root, 0, "A");
	rank(root, 0, "C");
	rank(root, 0, "G");
	rank(root, 0, "T");
}

function rank(node, d, c){

	let bin = PATTERN[c];// 2進数のパターン

	// 左からdビット目を調べる
	if(bin[d] == 0){
		// 0であれば左のノードを探索
		if(node.left != null){
			rank(node.left, d+1, c);// 再帰
			return;
		}
	}else{
		// 1であれば右のノードを探索
		if(node.right != null){
			rank(node.right, d+1, c);// 再帰
			return;
		}
	}

	// 最後の葉であれば、keyにある0か1か数を数える
	let cnt = 0;
	for(let i=0; i<node.key.length; i++){
		if(node.key[i] == bin[d]) cnt++;
	}

	console.log("文字:" + c + "の文字数は" + cnt + "です");
}

function makeNode(str, d){
	//console.log("makeNode:", str, d);
	let key = "";
	for(let i=0; i<str.length; i++){
		key += PATTERN[str[i]][d];
	}
	return new Node(str, key);
}

function makeTree(node, d){
	//console.log("makeTree:", node.str, node.key, d);
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

	if(!isOneType(strL)){// 文字が2種類以上
		let left = makeNode(strL, d);
		node.left = left;
		makeTree(left, d+1);
	}

	if(!isOneType(strR)){// 文字が2種類以上
		let right = makeNode(strR, d);
		node.right = right;
		makeTree(right, d+1);
	}
}

function checkTree(node){
	//console.log("checkTree:", node);
	if(node.left != null) checkTree(node.left);
	if(node.right != null) checkTree(node.right);
}

function isOneType(str){
	for(let i=1; i<str.length; i++){
		if(str[0] != str[i]) return false;
	}
	return true;
}

class Node{

	constructor(s, k){
		this._str = s;
		this._key = k;
		this._left = null;
		this._right = null;
	}

	get str(){return this._str;}

	get key(){return this._key;}
	set key(k){this._key = k;}
	get left(){return this._left;}
	set left(n){this._left = n;}
	get right(){return this._right;}
	set right(n){this._right = n;}
}