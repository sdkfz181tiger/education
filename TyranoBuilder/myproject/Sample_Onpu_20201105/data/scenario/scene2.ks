[_tb_system_call storage=system/_scene2.ks]

[cm  ]
[bg  time="1000"  method="crossfade"  storage="library.jpg"  ]
[glink  color="black"  storage="scene2.ks"  size="20"  target="*label_open"  x="250"  y="220"  width=""  height=""  _clickable_img=""  text="音楽再生"  ]
[s  ]
*label_open

[tb_show_message_window  ]
[tb_start_text mode=1 ]
楽譜を見る[p]
[_tb_end_text]

[tb_hide_message_window  ]
[iscript]
// 音楽再生エリア x, y, 幅, 高さ
readyScores(20, 40, 600, 180);
createScore(70, 20, "o_do.png", "o_do.ogg");// 音符ボタンの表示 x, y, oggデータ
createScore(190, 20,  "o_re.png", "o_re.ogg")
createScore(310, 20,  "o_mi.png", "o_mi.ogg");
createScore(430, 20,  "o_fa.png", "o_fa.ogg");
[endscript]

[glink  color="black"  storage="scene2.ks"  size="20"  text="楽譜を閉じる"  x="220"  y="280"  width=""  height=""  _clickable_img=""  target="*label_close"  ]
[s  ]
*label_close

[tb_show_message_window  ]
[tb_start_text mode=1 ]
楽譜を消す処理をしてから、他のページに移動しませう[p]
[_tb_end_text]

[tb_hide_message_window  ]
[iscript]
// 楽譜を消す処理
clearScores();
[endscript]

[s  ]
