console.log("Hello, JavaScript!!");

// H26秋 午後問3
//    連結リストを使用したマージソート

// ポインタを模倣したクラス
class Pointer {

	constructor(v){
		this._value = v;
		this._next = null;
	}

	get value(){return this._value;}
	set value(v){this._value = v;}

	get next(){return this._value;}
	set next(n){this._next = n;}
}

// 配列からポインタを再現
let nums = [6, 4, 3, 8, 7, 2, 1, 5];
let ptrs = [];
for(let i=0; i<nums.length; i++){
	let ptr = new Pointer(nums[i]);
	ptrs.push(ptr);
}

for(let i=0; i<ptrs.length-1; i++){
	ptrs[i].next = ptrs[i+1];
}

// 問題文の処理
console.log(ptrs);
divide(ptrs[0]);

// 分割処理

function divide(list){
	let a = list;
	let b = list.next;
	if(b != null) b = b.next;

	while()
}


