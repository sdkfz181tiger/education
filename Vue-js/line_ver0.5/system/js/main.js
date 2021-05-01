console.log("main.js!!");

// MyData
let myData = {
	txName: "",
	txData: "",
	txLogs: [],
	tnBase64: "",
	msgErrIcon: false,
	msgErrXLSX: false
}

// Vue
let app = new Vue({
	el: "#app",
	data: myData,
	methods:{
		createThumbnail(e){
			// Base64
			const files = e.target.files || e.dataTransfer.files;
			const file = files[0];
			const type = file.type;
			if(type !== "image/png" && type !== "image/jpeg" && type !== "image/gif"){
				this.msgErrIcon = true;
				return;
			}
			this.msgErrIcon = false;
			this.getBase64(file)
				.then(result=>{
					this.tnBase64 = result;
				}).catch(error=>console.log(error));
		},
		loadXLSX(e){
			// Load
			const files = e.target.files || e.dataTransfer.files;
			const file = files[0];
			if(file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
				this.msgErrXLSX = true;
				return;
			}
			this.msgErrXLSX = false;
			this.getXLSX(file)
				.then(result=>{
					const unit8 = new Uint8Array(result);
					const xlsx = XLSX.read(unit8, {type: "array"});
					const sheetName = xlsx["SheetNames"][0];
					const sheetData = xlsx["Sheets"][sheetName];
					const json = XLSX.utils.sheet_to_json(sheetData, {header: 1});
					const arr = [];
					for(let line of json){
						if(line.length <= 0) continue;
						if(line.length == 1) arr.push(line[0]);// Left
						if(line.length == 2) arr.push(" " + line[1]);// Right
					}
					this.txData = arr.join("\r\n");
				}).catch(error=>console.log(error));
		},
		getBase64(file){
			return new Promise((resolve, reject)=>{
				const reader = new FileReader();
				reader.onload = event => resolve(event.target.result);
				reader.onerror = error => reject(error);
				reader.readAsDataURL(file);
			});
		},
		getXLSX(file){
			return new Promise((resolve, reject)=>{
				const reader = new FileReader();
				reader.onload = event => resolve(event.target.result);
				reader.onerror = error => reject(error);
				reader.readAsArrayBuffer(file);
			});
		},
		createScreenshot(e){
			e.preventDefault();// Important
			// Screenshot
			html2canvas(document.querySelector("#screen")).then(canvas=>{ 
				const downloadEle = document.createElement("a");
				downloadEle.href = canvas.toDataURL("image/png");
				downloadEle.download = "screenshot.png";
				downloadEle.click();
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