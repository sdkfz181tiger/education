console.log("Hello JavaScript!!");

// The image we want to classify
const image = document.getElementById("image");
// The result tag in the HTML
const result = document.getElementById("result");
// The probability tag in the HTML
const probability = document.getElementById("probability");

// Initialize the Image Classifier method with MobileNet
const classifier = ml5.imageClassifier("MobileNet", function() {
	console.log("Model Loaded!");
});

// Make a prediction with the selected image
// This will return an array with a default of 10 options with their probabilities
classifier.predict(image, function(err, results){
	result.innerText = results[0].className;
	probability.innerText = results[0].probability.toFixed(4);
});