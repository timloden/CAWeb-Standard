<?php
/**
 * Content Fit Carousel Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */


// Create id attribute allowing for custom "anchor" value.
$id = 'content-fit-carousel-' . $block['id'];
if( !empty($block['anchor']) ) {
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$className = 'content-fit-carousel';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}
if( !empty($block['align']) ) {
    $className .= ' align' . $block['align'];
}

?>
<div id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($className); ?>">

<?php if( have_rows('slides') ): ?>

	<div class="carousel owl-carousel carousel-content <?php echo esc_attr($id); ?>">

	<?php while( have_rows('slides') ): the_row();

		// fields
		$title = get_sub_field('title');
		$image = get_sub_field('image');
		$text = get_sub_field('text');
		$backdrop = get_sub_field('use_text_background');
		$show_button = get_sub_field('show_button');
		$button_text = get_sub_field('button_text');
		$button_link = get_sub_field('button_link');

	?>

		<div class="item <?php if( $backdrop ) { echo 'backdrop'; } ?>" style="background-image: url('<?php echo esc_url($image['url']); ?>');">
			<div class="content-container">
	            <div class="content">
	                <?php if ($title) : ?>
	                	<h2><?php echo esc_attr($title); ?></h2>
	                <?php endif; ?>
	                <?php if ($text) : ?>
						<?php echo wp_kses_post($text); ?>
	                <?php endif; ?>
	            	<?php if ($show_button) : ?>
	            		<a href="<?php echo esc_url($button_link); ?>" class="btn btn-primary"><?php echo esc_attr($button_text); ?></a>
	            	<?php endif; ?>
	            </div>
	        </div>
		</div>

	<?php endwhile; ?>

	</div>

	<?php if (is_admin()) : ?>
	<style>
		.carousel-content {
			font-family: "Source Sans Pro", sans-serif;
		}
		.carousel-content .content-container h2 {
			color: #fff;
		}
	</style>

	<script>
		(function ($) {
			$( document ).ready(function() {
				$(".<?php echo esc_attr($id); ?>").owlCarousel({
					items: 1,
                    loop: true,
                    autoplay: false,
                    pagination: true,
                    nav: true,
                     navText: [
		                '<span class="ca-gov-icon-arrow-prev" aria-hidden="true"></span></span><span class="sr-only">Previous</span>', '<span class="ca-gov-icon-arrow-next" aria-hidden="true"></span><span class="sr-only">Next</span>'
		            ],
				});
			});
		})(jQuery);
	</script>

	<?php endif; ?>

<?php endif; ?>

</div>
