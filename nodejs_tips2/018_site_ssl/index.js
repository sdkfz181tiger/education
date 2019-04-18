console.log("Hello Node JS!!");

const express   = require("express");
const jquery    = require("express-jquery");
const ejs       = require("ejs");
const bParser   = require("body-parser");
const validator = require("validator");
//const sqlite3   = require("sqlite3");

const PORT_HTTP  = 3030;
const PORT_HTTPS = 4040;

let app = express();
app.engine("ejs", ejs.renderFile);
app.use(express.static("public"));
app.use(jquery("/jquery"));
app.use(bParser.urlencoded({extended: false}));

// let db = new sqlite3.Database("db.sqlite");
// let tableName = "users";

//=========
// Root
app.get("/", (req, res)=>{
	let title = "Hello World!!";
	let msg = "Root!!";
	res.render("index.ejs",
		{title: title, content: msg});
});

//==========
// HTTP Server
// http://tiger.local:3030
let http = require("http").Server(app);
http.listen(PORT_HTTP, ()=>{
	console.log("Start HTTP port:" + PORT_HTTP);
});

//==========
// HTTPS Server
// https://tiger.local:4040
let fs = require("fs");
let opt = {
	key:  fs.readFileSync("./ssl/server.key"),
	cert: fs.readFileSync("./ssl/server.crt"),
	passphrase: "rasp", // オレオレ証明書のパスワード
};
let https = require("https").Server(opt, app);
https.listen(PORT_HTTPS, ()=>{
	console.log("Start HTTPS port:" + PORT_HTTPS);
});