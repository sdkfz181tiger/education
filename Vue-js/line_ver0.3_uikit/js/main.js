console.log("main.js!!");

// Class
let classObj = {
	default: true,
	normal:  false,
	warning: false,
	danger:  false
}

// Logs
let logs = [
	{name: "You", text: "Hello, nice to meet you!!", time: "00:01:00", align: "right"},
	{name: "Joe", text: "Nice to meet you too!!", time: "00:02:00", align: "left"},
	{name: "You", text: "How are you!?", time: "00:03:00", align: "right"},
	{name: "Joe", text: "Fine thank you!!", time: "00:04:00", align: "left"}
];

// MyData
let myData = {
	txData: "",
	txLogs: logs
}

// Vue
let app = new Vue({
	el: "#app",
	data: myData,
	methods:{

	},
	computed:{
		txArea:{
			get(){
				return this.txData;
			},
			set(value){
				this.txData = value;
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

function calcBmi(){
	console.log("calcBmi!!");

	// Calc
	myData.nResult = myData.nWeight / Math.pow(myData.nHeight*0.01, 2);
	myData.nResult = Math.floor(myData.nResult * 100) * 0.01;
	
	classObj.default = false;
	classObj.normal  = false;
	classObj.warning = false;
	classObj.danger  = false;
	if(myData.nResult < 18){
		classObj.danger  = true;
	}else if(myData.nResult < 25){
		classObj.normal  = true;
	}else if(myData.nResult < 35){
		classObj.warning = true;
	}else{
		classObj.danger  = true;
	}

	// Logs
	let log = {weight: myData.nWeight, height: myData.nHeight, result: myData.nResult};
	logArr.push(log);
}