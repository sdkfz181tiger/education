console.log("Hello utility.js!!");

//==========
// Utility
function removeAllSprites(){
	for(let i=allSprites.length-1; 0<=i; i--){
		allSprites[i].remove();
	}
}