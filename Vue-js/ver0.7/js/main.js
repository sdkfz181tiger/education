console.log("main.js!!");

// Data
let data = {
	msgOK: "The system is operating normally.",
	msgNG: "An error has occurred in the system.",
	flg: true 
}

// Vue
let app = new Vue({
	el: "#app",
	data: data
});

function doAction(){
	data.flg  = !data.flg;
}