[_tb_system_call storage=system/_scene1.ks]

[cm  ]
[bg  storage="rouka.jpg"  time="1000"  ]
[iscript]
// 音符を重ねて表示します
// オルゴール再生エリア x, y, 幅, 高さ
readyMbox(200, 40, 180, 180, "music.ogg");
// 音符の表示 (x, y, off画像, on画像, 光るまでの間隔, 元に戻るまでの時間, 消えるまでの時間(0)は消えません)
createMboxNote(20, 20, "n_gray.png", "n_orange.png", 5000, 800, 0);
createMboxNote(20, 20, "n_gray.png", "n_green.png", 4000, 800, 50);
createMboxNote(20, 20, "n_gray.png", "n_yellow.png", 3000, 800, 50);
createMboxNote(20, 20, "n_gray.png", "n_blue.png", 2000, 800, 50);
createMboxNote(20, 20, "n_gray.png", "n_green.png", 1000, 800, 50);
[endscript]

*tgl_root

[tb_show_message_window  ]
[tb_start_text mode=1 ]
鳴った後に音符が消えるよ[p]
[_tb_end_text]

[tb_hide_message_window  ]
[glink  color="black"  storage="scene1.ks"  size="20"  text="プレイ"  target="*label_play"  x="260"  y="260"  width=""  height=""  _clickable_img=""  ]
[s  ]
*label_play

[iscript]
// オルゴール再生
playMbox();
[endscript]

[glink  color="black"  storage="scene1.ks"  size="20"  text="プレイ"  x="156"  y="297"  width=""  height=""  _clickable_img=""  target="*label_play"  ]
[glink  color="black"  storage="scene1.ks"  size="20"  text="トジル"  x="341"  y="297"  width=""  height=""  _clickable_img=""  target="*label_stop"  ]
[s  ]
*label_stop

[iscript]
// オルゴールを消す処理
clearMbox();
[endscript]

