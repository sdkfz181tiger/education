console.log("Hello, JavaScript!!");

// H26秋 午後問3
//    連結リストを使用したマージソート

window.onload = (event)=>{
	// 配列からポインタを再現
	let nums = [6, 4, 3, 8, 7, 2, 1, 5, 9];
	let ptrs = [];
	for(let i=0; i<nums.length; i++){
		let ptr = new Pointer(nums[i]);
		ptrs.push(ptr);
	}
	for(let i=0; i<ptrs.length-1; i++){
		ptrs[i].next = ptrs[i+1];
	}

	console.table(ptrs);
	let head = mergeSort(ptrs[0]);// マージソート
	while(head != null){// 結果を確認
		console.log(head.value);
		head = head.next;
	}
}

function mergeSort(p){
	if(p.next == null) return p;
	let l = p;
	let r = divide(l);// 分割処理
	return merge(mergeSort(l), mergeSort(r));// 結合処理
}

function divide(list){
	let l = list;
	let r = list.next;
	if(r.value != null) r = r.next;// 次のポインタへ

	while(r != null){
		l = l.next;
		r = r.next;
		if(r != null) r = r.next;// 次のポインタへ
	}
	let p = l.next;
	l.next = null;// 左側の最後尾
	return p;// 右側のポインタ
}

function merge(l, r){
	let head = new Pointer(0);// Dummy
	let p = head;

	while(l != null & r!= null){
		if(l.value < r.value){
			p.next = l;
			p = l;
			l = l.next;
		}else{
			p.next = r;
			p = r;
			r = r.next;
		}
	}

	if(l == null){
		p.next = r;
	}else{
		p.next = l;
	}

	return head.next;
}

// ポインタを模倣したクラス
class Pointer {

	constructor(v){
		this._value = v;
		this._next = null;
	}

	get value(){return this._value;}
	set value(v){this._value = v;}

	get next(){return this._next;}
	set next(n){this._next = n;}
}

