console.log("Hello JavaScript!!");

let numbers = [];

for(let i=0; i<10; i++){
	numbers.push(i);
}

console.log(numbers);

// フィッシャーイェーツのシャッフル
for(let i=numbers.length-1; 0<i; i--){
	let rdm = Math.floor(Math.random() * i);
	let tmp = numbers[i];
	numbers[i]   = numbers[rdm];
	numbers[rdm] = tmp;
}

console.log(numbers);