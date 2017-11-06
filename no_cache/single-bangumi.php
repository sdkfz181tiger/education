<?php

// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Single Posts Template
 *
 *
 * @file           single.php
 * @package        Responsive
 * @author         Emil Uzelac
 * @copyright      2003 - 2014 CyberChimps
 * @license        license.txt
 * @version        Release: 1.0
 * @filesource     wp-content/themes/responsive/single.php
 * @link           http://codex.wordpress.org/Theme_Development#Single_Post_.28single.php.29
 * @since          available since Release 1.0
 */

get_header(); ?>

<div id="content" class="<?php echo esc_attr( implode( ' ', responsive_get_content_classes() ) ); ?>" role="main">

	<?php get_template_part( 'loop-header', get_post_type() ); ?>

	<?php if ( have_posts() ) : ?>

		<?php while( have_posts() ) : the_post(); ?>

			<?php responsive_entry_before(); ?>
			<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				<?php responsive_entry_top(); ?>

				<?php get_template_part( 'post-meta', get_post_type() ); ?>

				<div class="post-entry">
					<?php
					include_once( ABSPATH . 'wp-admin/includes/plugin.php' ); 
					if( is_plugin_active('responsivepro-plugin/index.php')){
						responsivepro_plugin_featured_image();
					}
					the_content( __( 'Read more &#8250;', 'responsive' ) ); ?>

					<?php if ( get_the_author_meta( 'description' ) != '' ) : ?>

						<div id="author-meta">
							<?php if ( function_exists( 'get_avatar' ) ) {
								echo get_avatar( get_the_author_meta( 'email' ), '80' );
							} ?>
							<div class="about-author"><?php _e( 'About', 'responsive' ); ?> <?php the_author_posts_link(); ?></div>
							<p><?php the_author_meta( 'description' ) ?></p>
						</div><!-- end of #author-meta -->

					<?php endif; // no description, no author's meta ?>

					<?php wp_link_pages( array( 'before' => '<div class="pagination">' . __( 'Pages:', 'responsive' ), 'after' => '</div>' ) ); ?>
					<!-- カスタムフィールドを表示ここから -->
					<!-- 曜日を表示ここから -->
					<p class="week"><?php the_taxonomies( $week ); ?></p>
					<!-- 放送時間を表示ここから -->
					<p>放送時間：<?php
					$starttime_g = SCF::get('starttime_g');
					echo $starttime_g;
					?>:<?php
					$starttime_i = SCF::get('starttime_i');
					echo $starttime_i;
					?> ~ <?php
					$endtime_g = SCF::get('endtime_g');
					echo $endtime_g;
					?>:<?php
					$endtime_i = SCF::get('endtime_i');
					echo $endtime_i;
					?></p>
                    <!-- 放送内容を表示ここから -->
					<?php
					$introduction = SCF::get('introduction');
					echo nl2br($introduction);
					?>
					<!-- パーソナリティを表示ここから -->	
					担当パーソナリティ
					<dl>
						<dt>
							<?php
							$radiopersonality1 = SCF::get('radiopersonality1');
							foreach ($radiopersonality1 as $field) {
							}?>
							<a href="<?php echo get_permalink($field); ?>"><?php
								$radiopersonality1 = SCF::get('radiopersonality1');
								foreach ($radiopersonality1 as $field) {
	 							echo get_post($field)->post_title;//タイトル
	 							}?></a>
			 			</dt>
			 			<dt><?php
			 				$radiopersonality2 = SCF::get('radiopersonality2');
			 				foreach ($radiopersonality2 as $field) {
			 				}?>
			 				<a href="<?php echo get_permalink($field); ?>"><?php
			 				$radiopersonality2 = SCF::get('radiopersonality2');
			 				foreach ($radiopersonality2 as $field) {
							echo get_post($field)->post_title;//タイトル
							}?></a></dt>
						<dt>
							<?php
							$radiopersonality3 = SCF::get('radiopersonality3');
							foreach ($radiopersonality3 as $field) {
							}?>
							<a href="<?php echo get_permalink($field); ?>"><?php
							$radiopersonality3 = SCF::get('radiopersonality3');
							foreach ($radiopersonality3 as $field) {
							echo get_post($field)->post_title;//タイトル
							}
							?></a>
						</dt>
					</dl>
<!-- カスタムフィールドを表示ここまで -->	
<!-- 曜日を表示ここまで -->
	</div><!-- end of .post-entry -->

	<div class="navigation">
		<div class="previous"><?php previous_post_link( '&#8249; %link' ); ?></div>
		<div class="next"><?php next_post_link( '%link &#8250;' ); ?></div>
	</div><!-- end of .navigation -->

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

</div><!-- end of #content -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>
