[_tb_system_call storage=system/_preview.ks ]

[mask time=10]
[mask_off time=10]
[cm  ]
[bg  storage="rouka.jpg"  time="1000"  ]
[iscript]
// トグル表示エリア x, y, 幅, 高さ, [トグル用画像]
readyToggle(20, 40, 600, 180, ["tgl_0.png", "tgl_1.png", "tgl_2.png", "tgl_3.png"]);
createToggle(70, 20, 0, 1);// トグルボタンの表示 x, y, 初期番号, 正解番号
createToggle(190, 20, 1, 2)
createToggle(310, 20, 2, 3);
createToggle(430, 20, 3, 0);
[endscript]

[tb_start_tyrano_code]
[cm]
[eval exp="f.num=200"]
f.num の内容 : [emb exp="f.num"][l][r]
[_tb_end_tyrano_code]

*tgl_root

[tb_show_message_window  ]
[tb_start_text mode=1 ]
#天の声
各トグルを1クリックして"しらべる"ボタンを押してみる事ね[p]
[_tb_end_text]

[tb_hide_message_window  ]
[glink  color="black"  storage="scene1.ks"  size="20"  target="*tgl_check"  text="チェックしてみる"  x="200"  y="230"  width=""  height=""  _clickable_img=""  ]
[s  ]
*tgl_check

[tb_start_tyrano_code]
[if exp="checkToggles()"]
[_tb_end_tyrano_code]

[tb_show_message_window  ]
[tb_start_text mode=1 ]
あたりでんがな[p]
[_tb_end_text]

[tb_hide_message_window  ]
[iscript]
// 画面を遷移する直前に消しておくこと
clearToggles();
[endscript]

[jump  storage="scene_clear.ks"  target=""  ]
[tb_start_tyrano_code]
[else]
[_tb_end_tyrano_code]

[tb_show_message_window  ]
[tb_start_text mode=1 ]
はずれでんがな[p]
[_tb_end_text]

[tb_hide_message_window  ]
[jump  storage="scene1.ks"  target="*tgl_root"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

