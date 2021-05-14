console.log("main.js!!");

// MyData
let myData = {
	navStr: "Nav",
	mainStr: "Main",
	asideStr: "Aside",
	timeStr: "",
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
		// Date
		this.timeStr = this.formatTimeStr();
	},
	methods:{
		formatTimeStr(){
			const dObj = new Date();
			const h = ("0" + dObj.getHours()).slice(-2);
			const m = ("0" + dObj.getMinutes()).slice(-2);
			return h + ":" + m;
		}
	},
	computed:{
		
	},
	watch:{
		
	}
});
app.mount("#app");