// Template
const tmpClock = 
	'<div class="uk-grid-small uk-child-width-auto" uk-grid>' +
		'<div>' + 
			'<div class="uk-countdown-number">{{ h }}</div>' +
			'<div class="uk-countdown-label uk-margin-small uk-text-center">Hours</div>' +
		'</div>' + 
		'<div class="uk-countdown-separator">:</div>' +
		'<div>' + 
			'<div class="uk-countdown-number">{{ m }}</div>' +
			'<div class="uk-countdown-label uk-margin-small uk-text-center">Minutes</div>' +
		'</div>' + 
		'<div class="uk-countdown-separator">:</div>' +
		'<div>' + 
			'<div class="uk-countdown-number">{{ s }}</div>' +
			'<div class="uk-countdown-label uk-margin-small uk-text-center">Seconds</div>' +
		'</div>' +
	'</div>';

// MyData
let myData = {
	navStr: "Nav",
	asideStr: "Aside",
	intervalID: null,
	timeObj: {h: 0, m: 0, s: 0},
	msgErrOffline: false
}

const app = Vue.createApp({
	data(){
		return myData;
	},
	mounted(){
		// Online / Offline
		if(navigator.onLine){
			console.log("Online");
			this.msgErrOffline = false;
		}else{
			console.log("Offline");
			this.msgErrOffline = true;
		}
		// Start
		this.start();
	},
	methods:{
		start(){
			this.intervalID = setInterval(this.update, 200);
		},
		stop(){
			clearInterval(this.intervalID);
		},
		update(){
			const dateObj = new Date();
			this.timeObj.h = ("0" + dateObj.getHours()).slice(-2);
			this.timeObj.m = ("0" + dateObj.getMinutes()).slice(-2);
			this.timeObj.s = ("0" + dateObj.getSeconds()).slice(-2);
		}
	}
});

// Component
app.component("c_clock", {
	props: ["h", "m", "s"],
	template: tmpClock
});

// Mount
app.mount("#app");