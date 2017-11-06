<?php

// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Pages Template
 *
 *
 * @file           page.php
 * @package        Responsive
 * @author         Emil Uzelac
 * @copyright      2003 - 2014 CyberChimps
 * @license        license.txt
 * @version        Release: 1.0
 * @filesource     wp-content/themes/responsive/page.php
 * @link           http://codex.wordpress.org/Theme_Development#Pages_.28page.php.29
 * @since          available since Release 1.0
 */

get_header(); ?>

<div id="content" class="<?php echo esc_attr( implode( ' ', responsive_get_content_classes() ) ); ?>" role="main">

	<?php if ( have_posts() ) : ?>

		<?php while( have_posts() ) : the_post(); ?>

			<?php get_template_part( 'loop-header', get_post_type() ); ?>

			<?php responsive_entry_before(); ?>
			<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				<?php responsive_entry_top(); ?>

				<?php get_template_part( 'post-meta', get_post_type() ); ?>

				<div class="post-entry">
					<?php the_content( __( 'Read more &#8250;', 'responsive' ) ); ?>
					<?php wp_link_pages( array( 'before' => '<div class="pagination">' . __( 'Pages:', 'responsive' ), 'after' => '</div>' ) ); ?>
				</div><!-- end of .post-entry -->

				<?php get_template_part( 'post-data', get_post_type() ); ?>

				<?php responsive_entry_bottom(); ?>
			</div><!-- end of #post-<?php the_ID(); ?> -->
			<?php responsive_entry_after(); ?>

			<?php responsive_comments_before(); ?>
			<?php comments_template( '', true ); ?>
			<?php responsive_comments_after(); ?>

		<?php
		endwhile;

		get_template_part( 'loop-nav', get_post_type() );

	else :

		get_template_part( 'loop-no-posts', get_post_type() );

	endif;
	?>

	<!-- Timetable -->
	<h1>現在放送中の番組です</h1>
	<?php

		// 現在曜日、時間
		date_default_timezone_set('Asia/Tokyo');
		$indWeek = intval(date("w"));
		$arrWeek = array("sun", "mon", "tue", "wed", "thu", "fri", "sat");
		$strWeek = $arrWeek[$indWeek];
		$strNow  = date("Hi");        // 時刻(0000 ~ 2359)

		//==========
		// Test用(テストでお使いください)
		// $indWeek = 1;                 // 曜日(0:日, 1:月, 2:火, 3:水, 4:木, 5:金, 6:土)
		// $strWeek = $arrWeek[$indWeek];
		// $strNow  = '0159';            // 時刻(0200 ~ 2559)
		// echo "現在時刻:".$strNow."(".$strWeek.")<br/>";
		//==========

		// 時刻の読み替え(前日扱い)
		// 00:00 ~ 01:59 -> 24:00 ~ 25:59
		$intNow = intval($strNow);
		if($intNow < 200){
			if(0 < $indWeek){
				$strWeek = $arrWeek[$indWeek-1];
			}else{
				$strWeek = $arrWeek[count($arrWeek)-1];
			}
			$strNow = strval($intNow + 2400);
			//echo "修正時刻:".$strNow."(".$strWeek.")<br/>";
		}

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
				'relation' => 'AND',
				array(
					'key'     => 'starttime_'.$strWeek,// 曜日指定
					'value'   => $strNow,
					'type'    => 'numeric',
					'compare' => '<=',
				),
				// array(
				// 	'key'     => 'endtime_'.$strWeek,// 曜日指定
				// 	'value'   => $strNow,
				// 	'type'    => 'numeric',
				// 	'compare' => '>=',
				// )
			),
			'tax_query' => array(
				array(
					'taxonomy' => 'week',
					'field'    => 'slug',
					'terms'    => array($strWeek),// 曜日指定
				)
			),
		);
		$the_query = new WP_Query($args);
		if ( $the_query->have_posts() ) :
			while ( $the_query->have_posts() ) : $the_query->the_post();
	?>
			<!-- 番組情報:ここから -->
			<div class="post">
				<p class="title"><h3><?php the_title(); ?></h3></p>
				<!-- 曜日を表示ここから -->
				<p class="week"><?php the_taxonomies($week); ?></p>
				<!-- 放送時間を表示ここから -->	
				<p class="time">
					開始時間:<?php echo SCF::get('starttime_'.$strWeek); ?>
					~
					終了時間:<?php echo SCF::get('endtime_'.$strWeek); ?>
				</p>
			</div>
			<!-- 番組情報:ここまで -->
	<?php endwhile; endif; ?>
	<!-- end of Timetable -->

</div><!-- end of #content -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>
