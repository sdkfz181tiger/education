[_tb_system_call storage=system/_scene5.ks]

[bg  time="1000"  method="crossfade"  storage="rooftop.jpg"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
屋上に来た。[p]
[_tb_end_text]

[tb_hide_message_window  ]
*label_root

[clickable  storage="scene5.ks"  x="71"  y="135"  width="44"  height="170"  target="*label_door"  _clickable_img=""  ]
[clickable  storage="scene5.ks"  x="425"  y="129"  width="54"  height="85"  target="*label_touch_water"  _clickable_img=""  ]
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
[jump  storage="scene5.ks"  target="*label_root"  ]
[s  ]
*label_touch_water

[tb_start_tyrano_code]
; 塩を持っている場合
[if exp=" f.items.Oni"]

[_tb_end_tyrano_code]

[jump  storage="scene2.ks"  target="*label_noting"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

[iscript]
// アイテムゲット
setItem("Oni", "cursor_oni.png");
[endscript]

[tb_image_show  time="1000"  storage="default/item_oni.png"  width="85"  height="85"  x="282"  y="204"  _clickable_img=""  name="img_9"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
おにぎりをゲットした。。。[p]
[_tb_end_text]

[tb_hide_message_window  ]
[tb_image_hide  time="1000"  ]
[jump  storage="scene5.ks"  target="*label_root"  ]
[s  ]
