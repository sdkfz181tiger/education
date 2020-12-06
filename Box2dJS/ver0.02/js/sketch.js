"use strict";
//==========
// JavaScript

let Module;

// Window
window.addEventListener("load", (e)=>{
	console.log("load");
	if(!Box2D) Box2D = (typeof Box2D !== "undefined"?Box2D:null) || Module;
	Box2D().then((e)=>{
		Box2D = e;
		Module = Box2D;
		afterDocumentLoaded();
	});
});

const afterDocumentLoaded = function(){
	using(Box2D, "b2.+");
	init();
	changeTest();
	animate();
};