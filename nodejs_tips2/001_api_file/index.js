console.log("Hello Node JS!!");

const http      = require("http");
const fs        = require("fs");

// Test
let urlPath  = "http://ozateck.sakura.ne.jp/";
let savePath = "./data/" + getClientDate() + ".html";
let saveFile = fs.createWriteStream(savePath);

http.get(urlPath, (res)=>{
	res.pipe(saveFile);
	res.on("end", ()=>{
		saveFile.close();
	});
});

function getClientDate(){
	let date = new Date();
	let year = date.getFullYear();
	let mon  = date.getMonth() + 1;
	let day  = date.getDate();
	let hour = date.getHours();
	let min  = date.getMinutes();
	let sec  = date.getSeconds();
	if(mon  < 10) mon  = "0" + mon;
	if(day  < 10) day  = "0" + day;
	if(hour < 10) hour = "0" + hour;
	if(min  < 10) min  = "0" + min;
	if(sec  < 10) sec  = "0" + sec;
	return year + "-" + mon + "-" + day + "_" + hour + "-" + min + "-" + sec;
}