console.log("Hello Node JS!!");

const cheerio = require("cheerio-httpcli");
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("db.sqlite");
const tableName = "tweets";
const userName  = "ozateck";

//==========
// Cheerio
let url = "https://twitter.com/" + userName;
cheerio.fetch(url, {}, function(err, $, res){
	//let title = $("title").text();
	//console.log("title:" + title);
	$("#timeline ol").find("li").each(function(id, el){
		let twId = $(el).find("div").attr("data-tweet-id");
		let twText = $(el).find("p").text();
		if(twId) insertData(twId, twText);
	});
	db.close();
});

//==========
// SQLite

function insertData(twId, twText){
	console.log(twId + ":" + twText);

	let obj = {
		"tw_id": twId,
		"tw_text": twText
	};
	let keys = [];
	let binders = [];
	let values = [];
	for(key in obj){
		keys.push(key);
		values.push("'" + escapeStr(obj[key]) + "'");
		binders.push("?");
	}

	let sql = "INSERT OR REPLACE INTO " + tableName + "(" + keys.join(",") + ") VALUES(" + binders.join(",") + ")";

	// Database
	db.serialize(()=>{
		db.run(sql, values, (err)=>{
			if(!err){
				console.log("Inserted!!");
			}else{
				console.log("Error!!");
				console.log(err);
			}
		});
	});
}

function escapeStr(str){
	return str.replace(/\&/g, '&amp;').
	replace(/</g, '&lt;').replace(/>/g, '&gt;').
	replace(/"/g, '').replace(/'/g, '').
	replace(/:/g, '').replace(/;/g, '');
}