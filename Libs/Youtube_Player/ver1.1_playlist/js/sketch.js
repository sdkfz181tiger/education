console.log("Hello Youtube!!");

const V_WIDTH  = "480";
const V_HEIGHT = "320";
const V_ID     = "xjI5qbUB47k";// 会津ほまれ

const L_TYPE   = "playlist";
const L_LIST   = "PL0oMDasHWZ2imKzmddnwgP9Y9YNkmV_2Q";

window.onload = function(){
	console.log("onload!!");
	setTimeout(ready, 1000);
}

function ready(){
	// Ready
	let tag = document.createElement("script");
	tag.src = "https://www.youtube.com/iframe_api";
	let firstScriptTag = document.getElementsByTagName("script")[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady(){
	console.log("onYouTubeIframeAPIReady!!");
	// Player
	let player = new YT.Player("my_player", {
		width:   V_WIDTH,
		height:  V_HEIGHT,
		//videoId: V_ID,
		autoplay: 1,
		playerVars:{
			listType: L_TYPE, list: L_LIST
		},
		events:{
			"onReady": onPlayerReady,
			"onStateChange": onPlayerStateChange
		}
	});
}

function onPlayerReady(event){
	console.log("onPlayerReady!!");
	console.log(event);
	event.target.setPlaybackQuality("small");// Quality
	event.target.mute();                     // Mute
	event.target.playVideo();                // Play
}

function onPlayerStateChange(event){
	console.log("onPlayerStateChange:" + event.data);
	if(event.data == YT.PlayerState.ENDED)     console.log("ENDED!!");
	if(event.data == YT.PlayerState.PLAYING)   console.log("PLAYING!!");
	if(event.data == YT.PlayerState.PAUSED)    console.log("PAUSED!!");
	if(event.data == YT.PlayerState.BUFFERING) console.log("BUFFERING!!");
	if(event.data == YT.PlayerState.CUED)      console.log("CUED!!");
}