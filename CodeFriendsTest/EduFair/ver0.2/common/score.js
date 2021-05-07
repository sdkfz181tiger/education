//スコア
var score = 0;

//スコアのラベル
var scoreLabel;


//みんなに呼んでもらうメソッド
function showUIScore(scene) {

  //実行
  scoreLabel = showScore(scene, "white", "24pt 'PixelMplus10'", score);

  //内部処理
  function showScore(scene, color, font, score) {

    var label = new Label();

    label.color = color;
    label.font = font;
    label.width = scene.width;
    label.textAlign = "right";

    var sp = 10;
    label.x = -sp;
    label.y = +sp;

    label.text = "SCORE: " + score;

    scene.addChild(label);

    return label;
  }
}
