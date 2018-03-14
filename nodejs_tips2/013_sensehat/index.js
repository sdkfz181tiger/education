console.log("Hello Node JS!!");

const sense = require("sense-hat-led");

// On
let X = [255, 0, 0];
let O = [255, 255, 255];
let questionMark = [
	O, O, O, X, X, O, O, O,
	O, O, X, O, O, X, O, O,
	O, O, O, O, O, X, O, O,
	O, O, O, O, X, O, O, O,
	O, O, O, X, O, O, O, O,
	O, O, O, X, O, O, O, O,
	O, O, O, O, O, O, O, O,
	O, O, O, X, O, O, O, O
];
sense.setPixels(questionMark);

// Off
setTimeout(()=>{
	sense.clear();
}, 3000);