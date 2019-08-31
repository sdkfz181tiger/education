console.log("Hello Node JS!!");

const express   = require("express");
const jquery    = require("express-jquery");
const ejs       = require("ejs");
const bParser   = require("body-parser");
const validator = require("validator");
const sqlite3   = require("sqlite3");
const twitter   = require("twitter");

let db = new sqlite3.Database("db.sqlite");
let tableName  = "tweets";

// Twitter
var client = new twitter({
	consumer_key:        "",
	consumer_secret:     "",
	access_token_key:    "",
	access_token_secret: "",
});

// Accounts
let accounts = [
	""
];

let index = 0;
setTimeout(connectTwitter, 2000);
function connectTwitter(){
	if(index < accounts.length){
		searchTwitter(accounts[index]);
		setTimeout(connectTwitter, 2000);
	}
	index++;
}

//==========
// Twitter
function searchTwitter(screenName){
	client.get("statuses/user_timeline", {screen_name: screenName}, 
		function(error, tweets, response){
			if(!error){
				for(tweet of tweets) insertData(tweet);
			}
		});
}

//==========
// SQLite

function insertData(tweet){
	console.log(tweet.user.screen_name + ":" + tweet.created_at);

	let obj = {
		"id": tweet.id,
		"screen_name": tweet.user.screen_name,
		"text": tweet.text,
		"created_at": tweet.created_at,
		"geo": "null",
		"coordinates": "null",
		"place": "null"
	};

	if(tweet.geo != null){
		console.log("geo:" + tweet.geo.coordinates);
		obj["geo"] = tweet.geo.coordinates;
	}

	if(tweet.coordinates != null){
		console.log("coordinates:" + tweet.coordinates.coordinates);
		obj["place"] = tweet.coordinates.coordinates;
	}

	if(tweet.place != null){
		console.log("place:" + tweet.place.full_name);
		obj["place"] = tweet.place.full_name;
	}

	let keys = [];
	let binders = [];
	let values = [];
	for(key in obj){
		keys.push(key);
		values.push("'" + escapeStr(obj[key]) + "'");
		binders.push("?");
	}

	let sql = "INSERT INTO " + tableName + "(" + keys.join(",") + ") VALUES(" + binders.join(",") + ")";

	// Database
	db.serialize(()=>{
		db.run(sql, values, (err)=>{
			if(!err){
				console.log("Inserted!!");
			}else{
				console.log("Error!!");
				//console.log(err);
			}
		});
	});
}

//==========
// Utility
function escapeStr(str){
	if(str == "" || str == null || !isNaN(str)) return str;
	return str.replace(/\&/g, '&amp;').
	replace(/</g, '&lt;').replace(/>/g, '&gt;').
	replace(/"/g, '').replace(/'/g, '');
}