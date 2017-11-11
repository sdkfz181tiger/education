console.log("Hello Node JS!!");

const express = require("express");
const ejs     = require("ejs");
const bParser = require("body-parser");

const PORT = 3030;

let app = express();
app.engine("ejs", ejs.renderFile);
app.use(express.static("public"));
app.use(bParser.urlencoded({extended: false}));

//=========
// Root
app.get("/", (req, res)=>{
	let msg  = "Rootページです";
	let path = "/other?id=ex001&time=20171111";
	let json = {items:[]}
	res.render("index.ejs", 
		{title: "This is Root!!", content: msg, link:{href:path, text:"Other"}, data: json});
});

//==========
// Other
app.get("/other", (req, res)=>{
	let msg  = "ID:" + req.query.id + ", Time:" + req.query.time;
	let path = "/";
	let json = {items:[
		{id: "ex001", psw: "a", birth: "19790213"},
		{id: "ex002", psw: "b", birth: "19800314"},
		{id: "ex003", psw: "c", birth: "19810415"},
		{id: "ex004", psw: "d", birth: "19820516"},
		{id: "ex005", psw: "e", birth: "19830617"},
	]}
	res.render("index.ejs", 
		{title: "This is Other!!(GET)", content: msg, link:{href:path, text:"Root"}, data: json});
});

app.post("/other", (req, res)=>{
	let msg = "Price:" + req.body.price;
	let path = "/";
	let json = {items:[
		{id: "ex001", psw: "a", birth: "19790213"},
		{id: "ex002", psw: "b", birth: "19800314"},
		{id: "ex003", psw: "c", birth: "19810415"},
		{id: "ex004", psw: "d", birth: "19820516"},
		{id: "ex005", psw: "e", birth: "19830617"},
	]}
	res.render("index.ejs", 
		{title: "This is Other!!(POST)", content: msg, link:{href:path, text:"Root"}, data: json});
});

//==========
// Listen
app.listen(PORT, ()=>{
	console.log("Start server port:" + PORT);
});