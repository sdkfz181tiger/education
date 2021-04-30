console.log("main.js!!");

// MyData
let myData = {
	txName: "",
	txData: "",
	txLogs: [],
	tnBase64: ""
}

// Vue
let app = new Vue({
	el: "#app",
	data: myData,
	methods:{
		createThumbnail(e){
			// Base64
			const files = e.target.files || e.dataTransfer.files;
			this.getBase64(files[0]).then(image=>this.tnBase64 = image).catch(error=>console.log(error));
		},
		getBase64(file){
			// Promise
			return new Promise((resolve, reject)=>{
				const reader = new FileReader();
				reader.onload = () => resolve(reader.result);
				reader.onerror = error => reject(error);
				reader.readAsDataURL(file);
			});
		}
	},
	computed:{
		txInput:{
			get(){
				return this.txName;
			},
			set(value){
				this.txName = value;
			}
		},
		txArea:{
			get(){
				return this.txData;
			},
			set(value){
				this.txData = value;
			}
		}
	},
	watch:{
		txData:(value)=>{
			// Clear
			myData.txLogs.length = 0;// Important
			// Split
			const regLine = /\n|\r\n|\r/;
			const regSpace = /^ |^　/;
			const lines = value.split(regLine);
			for(let line of lines){
				if(line.length == 0 || line == " ") continue;
				if(line.match(regSpace) != null){
					myData.txLogs.push({name: "", text: line, youFlg: true});
				}else{
					myData.txLogs.push({name: myData.txName, text: line, youFlg: false});
				}
			}
		}
	}
});

function checkData(value){

	if(value == ""){
		myData.errFlg = true;
		myData.errMsg = "データを入力してください";
		return false;
	}

	if(!isFinite(value)){
		myData.errFlg = true;
		myData.errMsg = "数値データを入力してください";
		return false;
	}

	if(value <= 0){
		myData.errFlg = true;
		myData.errMsg = "正しいデータを入力してください";
		return false;
	}

	myData.errFlg = false;
	myData.errMsg = "***";
	return true;
}