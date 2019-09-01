console.log("main.js!!");

// Class
let classObj = {
	default: true,
	normal:  false,
	warning: false,
	danger:  false
}

// BMI
let bmiData = {
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
	data: bmiData,
	components: {
		"c_disp":{
			template: '<p v-bind:class="bmiData.classes">BMI:{{bmiData.nResult}}</p>'
		},
		"c_weight":{
			template: '<input v-on:input="doCheck" v-model="bmiData.nWeight"/>',
			methods: {
				doCheck: function(e){
					checkData(e.target.value);
				}
			}
		},
		"c_height":{
			template: '<input v-on:input="doCheck" v-model="bmiData.nHeight"/>',
			methods: {
				doCheck: function(e){
					checkData(e.target.value);
				}
			}
		},
		"c_ctl":{
			template: '<button v-on:click="doCalc">Calc</button>',
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
		bmiData.errFlg = true;
		bmiData.errMsg = "データを入力してください";
		return false;
	}

	if(!isFinite(value)){
		bmiData.errFlg = true;
		bmiData.errMsg = "数値データを入力してください";
		return false;
	}

	if(value <= 0){
		bmiData.errFlg = true;
		bmiData.errMsg = "正しいデータを入力してください";
		return false;
	}

	bmiData.errFlg = false;
	bmiData.errMsg = "***";
	return true;
}

function calcBmi(){
	console.log("calcBmi!!");

	// Calc
	bmiData.nResult = bmiData.nWeight / Math.pow(bmiData.nHeight*0.01, 2);
	bmiData.nResult = Math.floor(bmiData.nResult * 100) * 0.01;
	
	classObj.default = false;
	classObj.normal  = false;
	classObj.warning = false;
	classObj.danger  = false;
	if(bmiData.nResult < 18){
		classObj.danger  = true;
	}else if(bmiData.nResult < 25){
		classObj.normal  = true;
	}else if(bmiData.nResult < 35){
		classObj.warning = true;
	}else{
		classObj.danger  = true;
	}
}