console.log("Hello utility.js!!");

function createPlayer(x, y, img=null, scale=1){

	const player = createSprite(x, y);
	if(img) player.addImage(img);
	player.scale = scale;
	return player;
}

function createEnemy(arr, x, y, spd, deg, img=null, scale=1){

	const enemy = createSprite(x, y);
	if(img) enemy.addImage(img);
	enemy.scale = scale;
	enemy.setSpeed(spd, deg);
	arr.push(enemy);
}

function createBullet(arr, x, y, spd, deg){

	const bullet = createSprite(x, y, 8, 8);
	bullet.shapeColor = "white";
	bullet.setSpeed(spd, deg);
	arr.push(bullet);
}

function outToRemove(arr){

	for(let i=arr.length-1; 0<=i; i--){
		const spr = arr[i];
		if(spr.position.x < 0 || width < spr.position.x ||
			spr.position.y < 0 || height < spr.position.y) {
			arr.splice(i, 1);
		}
	}
}

function outToOverlap(arr){

	for(let i=arr.length-1; 0<=i; i--){
		const spr = arr[i];
		if(spr.position.x < 0) spr.position.x = width;
		if(width < spr.position.x) spr.position.x = 0;
		if(spr.position.y < 0) spr.position.y = height;
		if(height < spr.position.y) spr.position.y = 0;
	}
}

function collideToRemove(arrA, arrB, snd=null){

	loop:for(let a=arrA.length-1; 0<=a; a--){
		for(let b=arrB.length-1; 0<=b; b--){
			if(!arrA[a].overlap(arrB[b])) continue;
			arrA[a].remove();
			arrA.splice(a, 1);
			arrB[b].remove();
			arrB.splice(b, 1);
			if(snd) snd.play();
			continue loop;
		}
	}
}
	
function collide(spr, arr){

	const x = spr.position.x;
	const y = spr.position.y;
	for(let a=arr.length-1; 0<=a; a--){
		if(arr[a].overlapPoint(x, y)) return true;
	}
	return false;
}

function getColor(arr){
	let c = floor(random(arr.length));
	return arr[c];
}