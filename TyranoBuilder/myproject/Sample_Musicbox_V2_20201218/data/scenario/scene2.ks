[_tb_system_call storage=system/_scene2.ks]

[cm  ]
[bg  time="1000"  method="crossfade"  storage="library.jpg"  ]
[iscript]
// トグル表示エリア x, y, 幅, 高さ, [トグル用画像]
readyToggle(20, 40, 600, 180, ["tgl_0.png", "tgl_1.png", "tgl_2.png", "tgl_3.png"]);
createToggle(70, 20, 0, 1);// トグルボタンの表示 x, y, 初期番号, 正解番号
createToggle(190, 20, 1, 2);
createToggle(310, 20, 2, 3);
createToggle(430, 20, 3, 0);
[endscript]

[glink  color="black"  storage="scene2.ks"  size="20"  x="464"  y="17"  width=""  height=""  _clickable_img=""  text="テスト"  target="*label_success"  ]
[button  storage="scene2.ks"  target="*label_success"  graphic="check_btn.png"  width="220"  height="110"  x="16"  y="127"  _clickable_img=""  ]
[s  ]
*label_success

[tb_show_message_window  ]
[tb_start_text mode=1 ]
ボタンを押したね...!![p]
[_tb_end_text]

[tb_hide_message_window  ]
[s  ]
