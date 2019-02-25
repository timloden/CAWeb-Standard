<?php
/**
 * The template for displaying all single courses
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package CAWeb_Standard
 */

get_header();
?>

<?php
while ( have_posts() ) :
	the_post();

	get_template_part( 'template-parts/content', 'course-detail' );

endwhile; // End of the loop.
?>

<?php

get_footer();