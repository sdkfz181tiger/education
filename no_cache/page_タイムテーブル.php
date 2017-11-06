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
	<h1>タイムテーブルのテストです</h1>
	<?php
		$paged = (int) get_query_var('paged');
		$args = array(
			'posts_per_page' => 30,              // 1ページに30件表示
			'paged'          => $paged,
			'orderby'        => 'meta_value_num',
			'order'          => 'ASC',           // 昇順に並べる(降順はDESC)
			'post_type'      => 'bangumi',       // bangumi
			'post_status'    => 'publish',
			'meta_key'       => 'starttime_mon', // 放送開始時間(月曜日)
			'meta_type'      => 'NUMERIC',
			'tax_query' => array(
				array(
					'taxonomy' => 'week',        // タクソノミー
					'field'    => 'slug',
					'terms'    => array('mon'),  // 曜日指定(月曜日)
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
					開始時間:<?php echo SCF::get('starttime_t'); ?>
					~
					終了時間:<?php echo SCF::get('endtime_t'); ?>
				</p>
			</div>
			<!-- 番組情報:ここまで -->
		<?php endwhile; endif; ?>

		<?php
		if ($the_query->max_num_pages > 1) {
			echo paginate_links(array(
				'base' => get_pagenum_link(1) . '%_%',
				'format' => 'page/%#%/',
				'current' => max(1, $paged),
				'total' => $the_query->max_num_pages
			));
		}
	?><!-- end of Timetable -->

</div><!-- end of #content -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>
