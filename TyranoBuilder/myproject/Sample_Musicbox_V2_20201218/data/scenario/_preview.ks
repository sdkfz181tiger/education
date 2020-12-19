[_tb_system_call storage=system/_preview.ks ]

[mask time=10]
[mask_off time=10]
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

[bg  storage="school.jpg"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
オルゴールのサンプル[p]
[_tb_end_text]

[tb_hide_message_window  ]
[jump  storage="scene1.ks"  target=""  ]
