[_tb_system_call storage=system/_title_screen.ks]

[hidemenubutton]

[tb_clear_images]

[tb_start_tyrano_code]
[loadjs storage="plugin/base_plugin.js"]
[_tb_end_tyrano_code]

[iscript]
// 初期化
f.flgs = {};
f.items = {};
init(f);
[endscript]

[tb_keyconfig  flag="0"  ]
[bg  storage="school.jpg"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
大仏にアイテムを見せゲーム[p]
[_tb_end_text]

[tb_hide_message_window  ]
[jump  storage="scene2.ks"  target=""  ]
