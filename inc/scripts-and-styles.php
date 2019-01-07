<?php

// Remove style.css from wp_head so we can make overwrites
remove_action('wp_head', 'wp_print_styles');

/**
 * Enqueue styles.
 *
 * @example wp_enqueue_style($handle, $src, $deps, $ver, $media);
 */
function caweb_styles() {

	$general_settings = get_field('general_settings', 'option');
	$color_scheme = $general_settings['color_scheme'];
	
	wp_enqueue_style( 'global-styles', get_template_directory_uri() . '/styles/cagov.core.min.css', [], '5.5.0', 'all' );

	wp_enqueue_style( $color_scheme . '-theme', get_template_directory_uri() . '/styles/colorscheme-' . $color_scheme . '.min.css', [], '5.5.0', 'all' );

	wp_enqueue_style( 'caweb-standard', get_stylesheet_uri() );
}

add_action( 'wp_enqueue_scripts', 'caweb_styles', 99 );

/**
 * Enqueue scripts.
 *
 * @example wp_enqueue_script($handle, $src, $deps, $ver, $in_footer);
 */
function caweb_scripts() {

	// The main app scripts.
	wp_enqueue_script( 'cagov-core', get_template_directory_uri() . '/js/cagov.core.min.js', ['jquery'], '5.5.0', true );
	wp_enqueue_script( 'modernizr', get_template_directory_uri() . '/js/libs/modernizr-3.6.0.min.js', ['jquery'], '3.6.0', true );
	wp_enqueue_script( 'search', get_template_directory_uri() . '/js/search.js', [], '1.0.0', true );
	wp_enqueue_script( 'custom-js', get_template_directory_uri() . '/js/custom.js', [], '1.0.0', true );
	
}

add_action( 'wp_enqueue_scripts', 'caweb_scripts' );