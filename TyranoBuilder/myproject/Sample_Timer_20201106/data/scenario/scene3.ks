[_tb_system_call storage=system/_scene3.ks]

[bg  time="1000"  method="crossfade"  storage="rooftop.jpg"  ]
[iscript]
// タイマーをスタートします
readyTimer(480, 0, 120, 50);// x, y, w, h
startTimer(1000, 99, "*label_timeout");// ジャンプ先を指定する
[endscript]

[clickable  storage="scene3.ks"  x="69"  y="137"  width="52"  height="181"  target="*label_escape"  _clickable_img=""  ]
[s  ]
*label_timeout

[tb_show_message_window  ]
[tb_start_text mode=1 ]
時間切れでんがな[p]
[_tb_end_text]

[tb_hide_message_window  ]
[s  ]
*label_escape

[iscript]
// タイマーを削除します
clearTimer();
[endscript]

[tb_show_message_window  ]
[tb_start_text mode=1 ]
タイマーを削除して他の部屋へ。。。[p]
[_tb_end_text]

[tb_hide_message_window  ]
[s  ]
