// Vue.js
const MODEL_URL = "./models";

function createApp(){
	console.log("Hello Vue.js!!");

	new Vue({
		el: "#wrapper",
		data: {
			message: "Hello Vue.js",
			faces: []
		},
		mounted: function(){
			console.log("mounted!!");
		},
		methods:{
			testMethod(){
				this.loadModels();
			},
			async loadModels(){
				console.log("loadModels");
				Promise.all([
					faceapi.loadSsdMobilenetv1Model(MODEL_URL),
					faceapi.loadFaceLandmarkModel(MODEL_URL),
					faceapi.loadFaceRecognitionModel(MODEL_URL)
				]).then(this.detectAllFaces);
			},
			async detectAllFaces(){
				console.log("detectAllFaces");
				const img = document.getElementById("my-img");// Image
				const cvs = document.getElementById("my-cvs");// Canvas
				cvs.width = img.width;
				cvs.height = img.height;

				const detection = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
				faceapi.draw.drawDetections(cvs, detection);// Detections
				faceapi.draw.drawFaceLandmarks(cvs, detection);// Landmarks
				detection.forEach(face=>{
					console.log(face);
					this.faces.push(face);// Faces
				});
			}
		},
		computed:{
			
		}
	});
}

// 初期化
function initialize(){
	createApp();
}

document.addEventListener("DOMContentLoaded", initialize.bind(this));
