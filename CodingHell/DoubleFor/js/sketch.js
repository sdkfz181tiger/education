console.log("Hello JavaScript!!");

// 0から9までの繰り返し処理
for(var i=0; i<10; i++){
	console.log(i);
}

// 10から1までの繰り返し処理
for(var i=10; 0<i; i--){
	console.log(i);
}

// 0, 3, 6, 9, 12までの繰り返し処理
for(var i=0; i<=12; i+=3){
	console.log(i);
}

// 2重のfor文1
for(var r=0; r<5; r++){
	console.log("r:" + r);
	for(var c=0; c<5; c++){
		console.log("  c:" + c);
	}
}

// 2重のfor文2
for(var r=0; r<5; r++){
	console.log("r:" + r);
	for(var c=0; c<5; c++){
		console.log("  c:" + c);
		// 座標に応用
		var x = 32 * c;
		var y = 32 * r;
		console.log(x + "," + y);
	}
}