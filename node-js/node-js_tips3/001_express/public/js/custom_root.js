console.log("Hello Node JS!!");

// Load
$(window).on("load", ()=>{
	//console.log("Load!!");
});

// Unload
$(window).on("unload", ()=>{
	//console.log("Unload!!");
});

// Ready
$(document).ready(()=>{
	console.log("Ready!!");
	// Form
	$("form").submit((event)=>{
		event.preventDefault();
		$.post("./post", $("form").serialize()).done((data)=>{
			reload(data);
		});
    });
});

// Reload
function reload(rows){
	console.log("Reload!!");
	const rdm = Math.floor(Math.random() * 100);
	const path = "./json/chat.json?rdm=" + rdm;
	$("table").empty();
	$.each(rows, (key, val)=>{
		let uid  = "<td>" + val.uid + "</td>";
		let name = "<td>" + val.name + "</td>";
		let text = "<td>" + val.text + "</td>";
		let ip   = "<td>" + val.ip + "</td>";
		let date = "<td>" + val.date + "</td>";
		let line = "<tr>" + uid + name + text + ip + date + "</tr>";
		$("table").append(line);
	});
}