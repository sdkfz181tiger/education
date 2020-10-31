[_tb_system_call storage=system/_scene1.ks]

[cm  ]
[bg  storage="room.jpg"  time="1000"  ]
*label_root

[tb_show_message_window  ]
[tb_start_text mode=1 ]
テレビ(T) -> スピーカー(S) -> 時計(C)の順に押しませう[p]
[_tb_end_text]

[iscript]
var max = 3;// 3文字の長さに修正する
var len = f.keyWord.length;
if(f.keyWord.length > max) f.keyWord = f.keyWord.substring(len-3);
[endscript]

[tb_start_tyrano_code]
キーワード -> [emb exp="f.keyWord"][p]
[_tb_end_tyrano_code]

[tb_start_tyrano_code]
[if exp="f.keyWord=='TSC']
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
おおあたりぃぃいぃい!![p]
[_tb_end_text]

[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

[tb_hide_message_window  ]
[clickable  storage="scene1.ks"  x="105"  y="146"  width="72"  height="53"  target="*touch_tv"  _clickable_img=""  ]
[clickable  storage="scene1.ks"  x="371"  y="110"  width="37"  height="40"  target="*touch_clock"  _clickable_img=""  ]
[clickable  storage="scene1.ks"  x="292"  y="111"  width="38"  height="34"  target="*touch_speaker"  _clickable_img=""  ]
[s  ]
*touch_tv

[iscript]
f.keyWord += "T";
[endscript]

[jump  storage="scene1.ks"  target="*label_root"  ]
[s  ]
*touch_clock

[iscript]
f.keyWord += "C";
[endscript]

[jump  storage="scene1.ks"  target="*label_root"  ]
[s  ]
*touch_speaker

[iscript]
f.keyWord += "S";
[endscript]

[jump  storage="scene1.ks"  target="*label_root"  ]
[s  ]
