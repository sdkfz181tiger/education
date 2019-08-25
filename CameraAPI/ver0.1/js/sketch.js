console.log("Hello p5.js!!");

const POST_URL  = "./php/index.php";
const POST_NAME = "data";
 
window.onload = ()=>{
	log("onload!!");
	
	let myInput = $("#my_input");
	let myImg   = $("#my_img");

	myInput.on("change", (e)=>{
		let files = e.target.files;
		if(files.length <= 0) return;
		showBlob(files[0]);
		sendBase64(files[0]);
	});

	function showBlob(file){
		log("showBlob");
		let src = URL.createObjectURL(file);
		myImg.attr("src", src);
		URL.revokeObjectURL(src);// Revoke
	}

	function sendBase64(file){
		log("sendBase64");
		let reader = new FileReader();
		reader.onload = (e)=>{
			let base64 = e.target.result;
			let data   =  POST_NAME + "=" + base64;
			$.post(POST_URL, data).done(onDone).fail(onFail).always(onAlways);
		}
		reader.readAsBinaryString(file);

		function onDone(){
			console.log("onDone");
		}

		function onFail(){
			console.log("onFail");
		}

		function onAlways(){
			console.log("onAlways");
		}
	}

	function log(str){
		console.log(str);
		$("#my_log").append(str + "<br/>");
	}
}

