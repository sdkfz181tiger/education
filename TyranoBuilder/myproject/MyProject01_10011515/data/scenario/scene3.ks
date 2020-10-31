[_tb_system_call storage=system/_scene3.ks]

[bg  time="1000"  method="crossfade"  storage="tera.jpg"  ]
[tb_image_show  time="0"  storage="default/daibutu.png"  width="110"  height="170"  x="265"  y="175"  _clickable_img=""  name="img_1"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
こんな所にお寺が。。。[p]
[_tb_end_text]

[tb_hide_message_window  ]
*label_root

[clickable  storage="scene3.ks"  x="0"  y="354"  width="637"  height="89"  target="*label_door"  _clickable_img=""  ]
[clickable  storage="scene3.ks"  x="250"  y="190"  width="138"  height="146"  target="*label_ask"  _clickable_img=""  ]
[s  ]
*label_door

[tb_image_hide  time="0"  ]
[jump  storage="scene1.ks"  target=""  ]
[s  ]
*label_ask

[tb_show_message_window  ]
[tb_start_tyrano_code]
; 何か持っている場合
[if exp="myHand.key"]

[_tb_end_tyrano_code]

[tb_start_tyrano_code]
手に持っているのはは[emb exp="myHand.key"]ですね?[p]
[_tb_end_tyrano_code]

[tb_start_tyrano_code]
[else]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
私に何か見せてください。。。[p]
[_tb_end_text]

[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

[tb_hide_message_window  ]
[jump  storage="scene3.ks"  target="*label_root"  ]
[s  ]
