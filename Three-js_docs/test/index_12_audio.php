<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="utf-8">
	<title>Hello Three.js</title>
</head>
<body>
	<div id="stage"></div>
	<script src="../three.min.js"></script>
	<script src="../js/libs/stats.min.js"></script>
	<script src="../js/controls/TrackballControls.js"></script>
	<audio muted></audio>
	<canvas width=640 height=480></canvas>
	<script>
		navigator.getUserMedia = 
			navigator.getUserMedia || navigator.webkitGetUserMedia || 
			navigator.mozGetUserMedia || navigator.msGetUserMedia;
		
		var canvas = document.querySelector("canvas");
		var context = canvas.getContext("2d");
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		navigator.getUserMedia({audio : true}, onSuccess, onError);

		function onSuccess(stream){

			document.querySelector("audio").src = URL.createObjectURL(stream);
			var audioContext = new AudioContext();
			var analyser     = audioContext.createAnalyser();
			var timeDomain   = new Float32Array(analyser.frequencyBinCount);
			var frequency    = new Uint8Array(analyser.frequencyBinCount);
			audioContext.createMediaStreamSource(stream).connect(analyser);

			loop();
			function loop(){

				analyser.getFloatTimeDomainData(timeDomain);
				analyser.getByteFrequencyData(frequency);

				context.clearRect(0, 0, canvas.width, canvas.height);

				context.strokeStyle = "blue";
				context.beginPath();
				context.moveTo(0, canvas.height - frequency[0]*canvas.height/255);
				for(var i=0; i<frequency.length; i++){
					context.lineTo(
						i*canvas.width/frequency.length,
						canvas.height - Math.max(0, frequency[i]*canvas.height/255)
					);
				}
				context.stroke();

				window.requestAnimationFrame(loop);
			}
		}

		function onError(e){
			console.log("onError:" + e);
		}
	</script>
</body>
</html>