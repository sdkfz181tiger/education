console.log("main.js!!");

// Class
let classObj = {
	default: true,
	normal:  false,
	warning: false,
	danger:  false
}

// MyData
let myData = {
	nWeight: 60,
	nHeight: 160,
	nResult: 0,
	errFlg:  false,
	errMsg:  "***",
	classes: classObj
}

// Vue
let app = new Vue({
	el: "#app",
	data: myData,
	components: {
		"c_disp":{
			template: '<div v-bind:class="myData.classes">BMI:{{myData.nResult}}</div>'
		},
		"c_weight":{
			template: '<input v-on:input="doCheck" v-model="myData.nWeight"/>',
			methods: {
				doCheck: function(e){
					checkData(e.target.value);
				}
			}
		},
		"c_height":{
			template: '<input v-on:input="doCheck" v-model="myData.nHeight"/>',
			methods: {
				doCheck: function(e){
					checkData(e.target.value);
				}
			}
		},
		"c_ctl_enabled":{
			template: '<button v-on:click="doCalc" enabled>Calc</button>',
			methods: {
				doCalc: function(e){
					calcBmi();
				}
			}
		},
		"c_ctl_disabled":{
			template: '<button v-on:click="doCalc" disabled>Calc</button>',
			methods: {
				doCalc: function(e){
					calcBmi();
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
}