<?php

		//==========
		// 検索例1:全ての曜日を取得
		$paged = (int) get_query_var('paged');
		$args = array(
			'posts_per_page' => 30,              // 1ページに30件表示
			'paged'          => $paged,
			'orderby'        => 'meta_value_num',
			'order'          => 'ASC',           // 昇順に並べる(降順はDESC)
			'post_type'      => 'bangumi',       // bangumi
			'post_status'    => 'publish',
			'meta_key'       => 'starttime_t',   // 放送開始時間
			'meta_type'      => 'NUMERIC',
			'tax_query' => array(
				array(
					'taxonomy' => 'week',        // タクソノミー
					'field'    => 'slug',
					'terms'    => array('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'),// 曜日指定
				)
			),
		);
		// 以下略


		//==========
		// 検索例2:月曜日だけ
		$paged = (int) get_query_var('paged');
		$args = array(
			'posts_per_page' => 30,              // 1ページに30件表示
			'paged'          => $paged,
			'orderby'        => 'meta_value_num',
			'order'          => 'ASC',           // 昇順に並べる(降順はDESC)
			'post_type'      => 'bangumi',       // bangumi
			'post_status'    => 'publish',
			'meta_key'       => 'starttime_t',   // 放送開始時間
			'meta_type'      => 'NUMERIC',
			'tax_query' => array(
				array(
					'taxonomy' => 'week',        // タクソノミー
					'field'    => 'slug',
					'terms'    => array('mon'),// 曜日指定
				)
			),
		);
		// 以下略


		//==========
		// 検索例2:月曜日と水曜日だけ
		$paged = (int) get_query_var('paged');
		$args = array(
			'posts_per_page' => 30,              // 1ページに30件表示
			'paged'          => $paged,
			'orderby'        => 'meta_value_num',
			'order'          => 'ASC',           // 昇順に並べる(降順はDESC)
			'post_type'      => 'bangumi',       // bangumi
			'post_status'    => 'publish',
			'meta_key'       => 'starttime_t',   // 放送開始時間
			'meta_type'      => 'NUMERIC',
			'tax_query' => array(
				array(
					'taxonomy' => 'week',        // タクソノミー
					'field'    => 'slug',
					'terms'    => array('mon', 'wed'),// 曜日指定
				)
			),
		);
		// 以下略


		//==========
		// 現在放送中の番組1件
		// 現在曜日、時間
		date_default_timezone_set('Asia/Tokyo');
		$arrWeek = array("sun", "mon", "tue", "wed", "thu", "fri", "sat");
		$strWeek = $arrWeek[date("w")];// 曜日(sun ~ sat)
		$strNow  = date("Hi");         // 時刻(0000 ~ 2359)

		$paged = (int) get_query_var('paged');
		$args = array(
			'posts_per_page' => 1,
			'paged'          => $paged,
			'orderby'        => 'meta_value_num',
			'order'          => 'DESC',
			'post_type'      => 'bangumi',
			'post_status'    => 'publish',
			'meta_key'       => 'starttime_'.$strWeek,// 曜日指定
			'meta_type'      => 'NUMERIC',
			'meta_query' => array(
				array(
					'key'     => 'starttime_'.$strWeek,// 曜日指定
					'value'   => $strNow,
					'type'    => 'numeric',
					'compare' => '<=',
				),
			),
			'tax_query' => array(
				array(
					'taxonomy' => 'week',
					'field'    => 'slug',
					'terms'    => array($strWeek),// 曜日指定
				)
			),
		);
?>