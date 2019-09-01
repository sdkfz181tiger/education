console.log("main.js!!");

// ClassObj
let classObj = {
	clzRed: true,
	clzBlue: false
}

// Data
let data = {
	msg: "Hello vue.js!!",
	classes: classObj// ClassObj
}

// Vue
let app = new Vue({
	el: "#app",
	data: data
});

function doAction(){
	classObj.clzRed  = !classObj.clzRed;
	classObj.clzBlue = !classObj.clzBlue;
}