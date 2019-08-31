console.log("Hello Node JS!!");

const bParser = require("body-parser");
const ejs     = require("ejs");
const express = require("express");
const path    = require('path');

const PORT    = process.env.PORT || 3000;

let app = express();
app.engine("ejs", ejs.renderFile);
app.use(express.static("public"));
app.use(bParser.urlencoded({extended: false}));

//=========
// Root
app.get("/", (req, res)=>{
	let msg  = "Rootページ";
	let link = {href:"/other?id=ex001&time=20171111", text:"Other"};
	let json = {items:[]}
	res.render("index.ejs", 
		{title: "This is Root!!", content: msg, link:link, data: json});
});

//==========
// Other
app.get("/other", (req, res)=>{
	let msg  = "ID:" + req.query.id + ", Time:" + req.query.time;
	let link = {href:"/", text:"Root"};
	let json = {items:[
		{id: "ex001", psw: "a", birth: "19790213"},
		{id: "ex002", psw: "b", birth: "19800314"},
		{id: "ex003", psw: "c", birth: "19810415"},
		{id: "ex004", psw: "d", birth: "19820516"},
		{id: "ex005", psw: "e", birth: "19830617"},
	]}
	res.render("index.ejs", 
		{title: "This is Other!!(GET)", content: msg, link:link, data: json});
});

app.post("/other", (req, res)=>{
	let msg = "Price:" + req.body.price;
	let link = {href:"/", text:"Root"};
	let json = {items:[
		{id: "ex001", psw: "a", birth: "19790213"},
		{id: "ex002", psw: "b", birth: "19800314"},
		{id: "ex003", psw: "c", birth: "19810415"},
		{id: "ex004", psw: "d", birth: "19820516"},
		{id: "ex005", psw: "e", birth: "19830617"},
	]}
	res.render("index.ejs", 
		{title: "This is Other!!(POST)", content: msg, link:link, data: json});
});

//==========
// Listen
app.listen(PORT, ()=>{
	console.log("Start server port:" + PORT);
});