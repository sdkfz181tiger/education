console.log("main.js!!");

// BMI
let bmiData = {
	weight: 0,
	height: 0,
	result: 0
}

// Vue
let app = new Vue({
	el: "#app",
	data: bmiData,
	components: {
		"cmpdisp":{
			template: '<p>BMI:{{bmiData.result}}</p>'
		},
		"cmpinput":{
			template: '<input type="Number" v-on:input="doInput"/>',
			methods: {
				doInput: function(e){
					console.log("doInput!!");
				}
			}
		},
		"cmpctl":{
			template: '<button v-on:click="doCalc">Calc</button>',
			methods: {
				doCalc: function(e){
					console.log("doCalc!!");
					bmiData.result++;
				}
			}
		}
	}
});