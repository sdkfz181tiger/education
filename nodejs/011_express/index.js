console.log("Hello Node JS!!");

const express = require("express");
const ejs     = require("ejs");

const PORT = 3030;

let app = express();
app.engine("ejs", ejs.renderFile);
app.use(express.static("public"));

//=========
// Root
app.get("/", (req, res)=>{
	let msg  = "Rootページです";
	res.render("index.ejs", 
		{title: "This is Root!!", content: msg});
});

//==========
// Listen
app.listen(PORT, ()=>{
	console.log("Start server port:" + PORT);
});