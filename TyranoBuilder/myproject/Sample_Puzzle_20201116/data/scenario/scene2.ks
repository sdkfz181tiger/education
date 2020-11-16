[_tb_system_call storage=system/_scene2.ks]

[cm  ]
[bg  time="1000"  method="crossfade"  storage="library.jpg"  ]
[iscript]
// パズル表示エリア x, y, 幅, 高さ, パズル行列数3x3, ピースサイズ, 完成時ジャンプ先
readyPuzzle(50, 40, 540, 400, 3, 120, "*label_success");
// ピースを設置 x, y, ピース番号, ピース画像
loadPiece(0, 0, "p_0.png");
loadPiece(0, 1, "p_1.png");
loadPiece(0, 2, "p_2.png");
loadPiece(1, 0, "p_3.png");
loadPiece(1, 1, "p_4.png");
loadPiece(1, 2, "p_5.png");
loadPiece(2, 0, "p_6.png");
loadPiece(2, 1, "p_7.png");
loadPiece(2, 2, "p_8.png");
// パズル表示
updatePuzzle();
[endscript]

[s  ]
*label_success

[iscript]
// パズルを削除しましょう
clearPuzzle();
[endscript]

[tb_show_message_window  ]
[tb_start_text mode=1 ]
完成だ!![p]
[_tb_end_text]

[tb_hide_message_window  ]
[s  ]
