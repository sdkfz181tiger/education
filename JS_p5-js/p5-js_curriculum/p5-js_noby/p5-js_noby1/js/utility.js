console.log("Hello utlility.js!!");

//==========
// Utility

let reformStr = function(){
	let escapes = {
			'、': '、\n',
			'。': '。\n'
		};
	let re = /[、。！？]/g;
	function replacer(c) { return escapes[c]; }
	return function(html) { return html.replace(re, replacer); };
}();

let escapeHTML = function(){
	let escapes = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#x27;'
		};
	let re = /[&<>"']/g;
	function replacer(c) { return escapes[c]; }
	return function(html) { return html.replace(re, replacer); };
}();