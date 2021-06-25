console.log("Hello FaceAPI!!");

const DICT_PATH = "./dict";

// Main
window.onload = (event)=>{

	const str = "昔々、あるところにお爺さんとお婆さんが住んでいたそうな";

	// Kuromoji
	kuromoji.builder({dicPath: DICT_PATH}).build((err, tokenizer)=>{
		const tokens = tokenizer.tokenize(str);
		tokens.forEach((token)=>{
			console.log(token);
			console.log(token.pos + ":" + token.surface_form);
		});
	});
}