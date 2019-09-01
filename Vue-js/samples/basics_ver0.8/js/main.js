console.log("main.js!!");

// Addresses
let addresses = [
	{name: "Yamada",    email: "yam@gmail.com", tel:"0120-111-111"},
	{name: "Joshin",    email: "jos@gmail.com", tel:"0120-222-222"},
	{name: "Yodobashi", email: "yod@gmail.com", tel:"0120-333-333"},
	{name: "Bigcamera", email: "big@gmail.com", tel:"0120-444-444"}
];

// Data
let data = {
	items: addresses// Addresses 
}

// Vue
let app = new Vue({
	el: "#app",
	data: data
});

function doAction(){
	
}