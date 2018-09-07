console.log("Hello JavaScript!!");

let numbers = [];

for(let i=0; i<10; i++){
	numbers.push(i);
}
console.log(numbers);

let results = [];

while(0 < numbers.length){
	let rdm = Math.floor(Math.random() * numbers.length);
	results.push(numbers[rdm]);
	numbers.splice(rdm, 1);
}

console.log(results);