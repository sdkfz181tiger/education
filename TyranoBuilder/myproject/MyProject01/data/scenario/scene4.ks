[_tb_system_call storage=system/_scene4.ks]

[bg  time="1000"  method="crossfade"  storage="courtyard.jpg"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
中庭に来た。[p]
[_tb_end_text]

[tb_hide_message_window  ]
*label_root

[clickable  storage="scene4.ks"  x="44"  y="158"  width="97"  height="101"  target="*label_door"  _clickable_img=""  ]
[clickable  storage="scene4.ks"  x="534"  y="272"  width="100"  height="100"  target="*label_touch_chair"  _clickable_img=""  ]
[s  ]
*label_door

[jump  storage="scene1.ks"  target=""  ]
[s  ]
*label_nothing

[tb_show_message_window  ]
[tb_start_text mode=1 ]
もう何もない。。。[p]
[_tb_end_text]

[tb_hide_message_window  ]
[jump  storage="scene4.ks"  target="*label_root"  ]
[s  ]
*label_touch_chair

[tb_start_tyrano_code]
; みそしるを持っている場合
[if exp=" f.items.Miso"]

[_tb_end_tyrano_code]

[jump  storage="scene4.ks"  target="*label_nothing"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

[iscript]
// アイテムゲット
setItem("Miso", "cursor_miso.png");
[endscript]

[tb_image_show  time="1000"  storage="default/item_miso.png"  width="85"  height="85"  x="282"  y="204"  _clickable_img=""  name="img_9"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
みそしるをゲットした。。。[p]
[_tb_end_text]

[tb_hide_message_window  ]
[tb_image_hide  time="1000"  ]
[jump  storage="scene4.ks"  target="*label_root"  ]
[s  ]
