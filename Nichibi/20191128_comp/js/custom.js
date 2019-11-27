console.log("Hello, Photogallery!!");

// アルバムデータ
let album = [
    {"src":"./images/pic01.png", "msg": "晴れています"},
    {"src":"./images/pic02.png", "msg": "曇っています"},
    {"src":"./images/pic03.png", "msg": "雨が降っています"},
    {"src":"./images/pic04.png", "msg": "雪が降っています"}
];

// 画像
let mainImage = document.createElement("img");
mainImage.setAttribute("src", album[0].src);
mainImage.setAttribute("alt", album[0].msg);

// キャプション
let mainMsg = document.createElement("p");
mainMsg.innerText = mainImage.alt;

// 画像とキャプションを表示
let mainFlame = document.querySelector("#gallery .main");
mainFlame.insertBefore(mainImage, null);
mainFlame.insertBefore(mainMsg, null);

// サムネイル
let thumbFlame = document.querySelector("#gallery .thumb");
for(let i=0; i<album.length; i++){
    let thumbImage = document.createElement("img");
    thumbImage.setAttribute("src", album[i].src);
    thumbImage.setAttribute("alt", album[i].msg);
    thumbFlame.insertBefore(thumbImage, null);
}

// クリックした画像を表示する
thumbFlame.addEventListener("click", function(event){
    if(event.target.src){
        mainImage.src = event.target.src;
        mainMsg.innerText = event.target.alt;
    }
});