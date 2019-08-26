console.log("Hello p5.js!!");

const POST_URL  = "./php/index.php";// POST送信先URL
const POST_NAME = "data";           // POSTデータ名
const ID_INPUT  = "#my_input";      // <input>のid
const ID_IMG    = "#my_img";        // <img>のid
const ID_LOG    = "#my_log";        // 確認用
 
window.onload = ()=>{
	console.log("onload!!");

	// カメラマネージャー
	let camMng = new CameraManager();
	camMng.init(()=>{
		camMng.showBlob();  // 撮影した画像を表示する
		camMng.sendBase64();// 撮影した画像をBase64形式にしてPost送信
	});
}

// カメラマネージャー
class CameraManager{

	constructor(){
		this._files = [];
		this._myInput = $(ID_INPUT);
		this._myImg   = $(ID_IMG);
	}

	init(onChange){
		this._myInput.on("change", (e)=>{
			this._files = e.target.files;
			if(this._files.length <= 0) return;
			onChange();
		});
	}

	showBlob(){
		let file = this._files[0];
		let src  = URL.createObjectURL(file);
		this._myImg.attr("src", src);
		URL.revokeObjectURL(src);// Revoke
	}

	sendBase64(){
		let file  = this._files[0];
		let reader = new FileReader();
		reader.onload  = (e)=>{
			let base64 = e.target.result;
			let data   = POST_NAME + "=" + base64;
			$.post(POST_URL, data).done(onDone).fail(onFail).always(onAlways);
		}
		reader.readAsBinaryString(file);

		function onDone(){
			console.log("onDone");
			$(ID_LOG).append("onDone!!<br/>");
		}

		function onFail(){
			console.log("onFail");
			$(ID_LOG).append("onFail!!<br/>");
		}

		function onAlways(){
			console.log("onAlways");
			$(ID_LOG).append("onAlways!!<br/>");
		}
	}
}

