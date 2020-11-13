[_tb_system_call storage=system/_scene2.ks]

[cm  ]
[bg  time="1000"  method="crossfade"  storage="library.jpg"  ]
[iscript]
// オルゴール再生エリア x, y, 幅, 高さ
readyMbox(20, 40, 600, 180, "music.ogg");
// 音符の表示 (x, y, off画像, on画像, 光るまでの間隔, 元に戻るまでの時間)
createMboxNote(60, 20, "n_gray.png", "n_orange.png", 1000, 800);
createMboxNote(160, 20, "n_gray.png", "n_green.png", 2000, 800);
createMboxNote(260, 20, "n_gray.png", "n_yellow.png", 3000, 800);
createMboxNote(360, 20, "n_gray.png", "n_blue.png", 4000, 800);
createMboxNote(460, 20, "n_gray.png", "n_green.png", 5000, 800);
[endscript]

[glink  color="black"  storage="scene2.ks"  size="20"  target="*label_play"  x="240"  y="280"  width=""  height=""  _clickable_img=""  text="プレイ"  ]
[s  ]
*label_play

[iscript]
// オルゴール再生
playMbox();
[endscript]

[glink  color="black"  storage="scene2.ks"  size="20"  target="*label_play"  text="リプレイ"  x="130"  y="280"  width=""  height=""  _clickable_img=""  ]
[glink  color="black"  storage="scene2.ks"  size="20"  text="クローズ"  x="330"  y="280"  width=""  height=""  _clickable_img=""  target="*label_close"  ]
[s  ]
*label_close

[tb_show_message_window  ]
[tb_start_text mode=1 ]
オルゴールを消す処理を必ず入れましょう[p]
[_tb_end_text]

[tb_hide_message_window  ]
[iscript]
// オルゴールを消す処理
clearMbox();
[endscript]

[s  ]
