console.log("Hello p5.js!!");

let nums = [0, 0, 0];

let tSlot = setInterval(()=>{
	roll();
}, 100);

setTimeout(()=>{
	clearInterval(tSlot);
	//judge();
}, 1000*3);

function roll(){
	console.clear();
	for(let i=0; i<nums.length; i++){
		nums[i] = getRandom(1, 3);
	}
	console.log(nums);
}

function getRandom(min, max){
	let rdm = min + Math.floor(Math.random() * (max-min+1));
	return rdm;
}

function judge(){
	if(nums[0] == nums[1] && nums[0] == nums[2]){
		console.log("ATARI!! (^o^ )");
	}else{
		console.log("HAZURE!! (*_*;)");
	}
}