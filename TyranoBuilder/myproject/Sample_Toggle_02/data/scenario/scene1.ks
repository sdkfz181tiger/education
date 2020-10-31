[_tb_system_call storage=system/_scene1.ks]

[cm  ]
[bg  storage="rouka.jpg"  time="1000"  ]
[iscript]
readyToggle(20, 40, 600, 180, ["tgl_0.png", "tgl_1.png", "tgl_2.png", "tgl_3.png"]);
createToggle(70, 20, 0, 1);
createToggle(190, 20, 1, 2)
createToggle(310, 20, 2, 3);
createToggle(430, 20, 3, 0);
[endscript]

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
[jump  storage="scene1.ks"  target="*tgl_root"  ]
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

