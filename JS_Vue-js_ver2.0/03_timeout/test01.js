/*

グローバル関数とコールバック関数

	グローバル関数とは!?
		JavaScriptにあらかじめ定義された関数です。

	コールバック関数とは!?
		他の関数に引数として指定された関数です。

1, setTimeout関数(グローバル関数)を使ってみよう

	指定した時間(ミリ秒)経過すると、コールバック関数が1度だけ実行される関数です。
	タイムアウトIDをclearTimeout関数に指定する事で停止する事ができます。

	例(実行):
		let タイムアウトID = setTimeout(コールバック関数, ミリ秒);

	例(停止):
		clearTimeout(タイムアウトID);
*/

// タイムアウトを使う
// コールバック関数を用意する(callback1変数に格納しておく)
let callback1 = function(){
	console.log("今夜はカレーライスだ!!");
}

// 1秒後にcallback1に格納されている関数を実行する
let id1 = setTimeout(callback1, 1000);

// タイムアウトを停止する
//clearTimeout(id1);

/*

2, setInterval関数(グローバル関数)を使ってみよう

	指定した時間(ミリ秒)経過すると、コールバック関数が一定間隔で永続的に実行される関数です。
	インターバルIDをclearInterval関数に指定する事で停止する事ができます。

	例(実行):
		let インターバルID = setInterval(コールバック関数, ミリ秒);

	例(停止):
		clearInterval(インターバルID);
*/

// インターバルを使う
// コールバック関数を用意する(callback2変数に格納しておく)
let callback2 = function(){
	console.log("今夜はハヤシライスだ!!");
}

// 1秒間隔でcallback2に格納されている関数を実行する
let id2 = setInterval(callback2, 3000);

// インターバルを停止する
//clearInterval(id2);


