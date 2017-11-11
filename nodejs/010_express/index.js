console.log("Hello Node JS!!");

const exp = require("express");
const ejs = require("ejs");

const PORT = 3030;

let app = exp();
app.engine("ejs", ejs.renderFile);
app.use(exp.static("public"));

app.get("/", (req, res)=>{
	res.render("index.ejs", 
		{title: "This is title!!", content: "This is Root!!", link:{href:"/other", text:"Other"}});
});

app.get("/other", (req, res)=>{
	res.render("index.ejs", 
		{title: "This is title!!", content: "This is Other!!", link:{href:"/", text:"Root"}});
});

app.listen(PORT, ()=>{
	console.log("Start server port:" + PORT);
});