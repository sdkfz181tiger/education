console.log("Hello JavaScript!!");

let target = 10;

let result = -1;

let numbers = [1, 9, 5, 16, 10, 7];

for(let i=0; i<numbers.length; i++){
	if(target == numbers[i]){
		result = i;
	}
}

console.log(result);