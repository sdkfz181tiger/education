console.log("Hello utility.js!!");

//==========
// Utility
function removeAllSprites(){
	for(let i=allSprites.length-1; 0<=i; i--){
		allSprites[i].remove();
	}
}

function startCountDown(time, interval, countDown){
	let counter = time;
	tick();
	function tick(){
		window.setTimeout(()=>{
			countDown(counter);
			counter--;
			if(0 <= counter){
				tick();
			}
		}, interval);
	}
}

function startInterval(interval, interDown){
	tick();
	function tick(){
		console.log("tick:" + interval);
		window.setTimeout(()=>{
			interDown(interval);
		}, interval);
	}
}

function startIntervals(intervals, interDown){
	let index = 0;
	tick();
	function tick(){
		console.log("tick:" + intervals[index]);
		window.setTimeout(()=>{
			interDown(intervals[index]);
			index++;
			if(index < intervals.length){
				tick();
			}
		}, intervals[index]);
	}
}