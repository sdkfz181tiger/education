[_tb_system_call storage=system/_scene3.ks]

[bg  time="1000"  method="crossfade"  storage="rooftop.jpg"  ]
[iscript]
// タイマーをスタートします
readyTimer(480, 0, 120, 50);
startTimer(1000, 99, "*label_timeout");
[endscript]

[s  ]
*label_timeout

[tb_show_message_window  ]
[tb_start_text mode=1 ]
時間切れでんがな[p]
[_tb_end_text]

[tb_hide_message_window  ]
