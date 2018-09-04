console.log("Hello JavaScript!!");

let max = 0;

let numbers = [1, 9, 5, 16, 10, 7];

for(let i=0; i<numbers.length; i++){
	if(max < numbers[i]){
		max = numbers[i];
	}
}

console.log(max);