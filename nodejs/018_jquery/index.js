console.log("Hello Node JS!!");

const express = require("express");
const jquery  = require("express-jquery");
const ejs     = require("ejs");
const bParser = require("body-parser");

const PORT = 3030;

let app = express();
app.engine("ejs", ejs.renderFile);
app.use(express.static("public"));
app.use(jquery("/jquery"));
app.use(bParser.urlencoded({extended: false}));

//=========
// Root
app.get("/", (req, res)=>{
	let msg  = "Rootページです";
	let json = {items:[]}
	res.render("index.ejs", 
		{title: "This is Root!!", content: msg, data: json});
});

//==========
// Listen
app.listen(PORT, ()=>{
	console.log("Start server port:" + PORT);
});