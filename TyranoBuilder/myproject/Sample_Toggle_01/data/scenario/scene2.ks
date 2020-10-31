[_tb_system_call storage=system/_scene2.ks]

[bg  time="1000"  method="crossfade"  storage="room.jpg"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
教室に入った。[p]
[_tb_end_text]

[tb_hide_message_window  ]
*label_root

[clickable  storage="scene2.ks"  x="520"  y="158"  width="78"  height="165"  target="*label_touch_door"  _clickable_img=""  ]
[clickable  storage="scene2.ks"  x="107"  y="148"  width="63"  height="50"  target="*label_touch_tv"  _clickable_img=""  ]
[clickable  storage="scene2.ks"  x="372"  y="110"  width="35"  height="43"  target="*label_touch_clock"  _clickable_img=""  ]
[s  ]
*label_touch_tv

[tb_start_tyrano_code]
; 塩を持っている場合
[if exp=" f.items.Salt"]

[_tb_end_tyrano_code]

[jump  storage="scene2.ks"  target="*label_noting"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

[iscript]
// アイテムゲット
setItem("Salt", "cursor_salt.png");
[endscript]

[tb_image_show  time="1000"  storage="default/item_salt.png"  width="100"  height="175"  x="280"  y="140"  _clickable_img=""  name="img_9"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
塩をゲットした。。。[p]
[_tb_end_text]

[tb_hide_message_window  ]
[tb_image_hide  time="1000"  ]
[jump  storage="scene2.ks"  target="*label_root"  ]
[s  ]
*label_touch_clock

[tb_start_tyrano_code]
; 胡椒を持っている場合
[if exp=" f.items.Pepper"]

[_tb_end_tyrano_code]

[jump  storage="scene2.ks"  target="*label_noting"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

[iscript]
// アイテムゲット
setItem("Pepper", "cursor_pepper.png");
[endscript]

[tb_image_show  time="1000"  storage="default/item_pepper.png"  width="100"  height="175"  x="280"  y="140"  _clickable_img=""  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
胡椒をゲットした。。。[p]
[_tb_end_text]

[tb_hide_message_window  ]
[tb_image_hide  time="1000"  ]
[jump  storage="scene2.ks"  target="*label_root"  ]
[s  ]
*label_noting

[tb_show_message_window  ]
[tb_start_text mode=1 ]
もう何もない。。。[p]
[_tb_end_text]

[tb_hide_message_window  ]
[jump  storage="scene2.ks"  target="*label_root"  ]
[s  ]
*label_touch_door

[tb_show_message_window  ]
[tb_start_text mode=1 ]
外に出よう。。。[p]
[_tb_end_text]

[tb_hide_message_window  ]
[jump  storage="scene1.ks"  target=""  ]
[s  ]
