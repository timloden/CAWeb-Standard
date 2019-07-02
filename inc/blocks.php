<?php

function register_acf_block_types() {

	// register a panel block.

	acf_register_block_type(array(
		'name'              => 'panel-module',
		'title'             => __('Panel'),
		'description'       => __('CA panel module'),
		'render_template'   => 'blocks/panel/panel.php',
		'category'          => 'layout',
		'icon'              => 'admin-comments',
		'keywords'          => array( 'panel' ),
	));

	// register a panel block.

	acf_register_block_type(array(
		'name'              => 'content-fit-carousel',
		'title'             => __('Content Fit Carousel'),
		'description'       => __(''),
		'render_template'   => 'blocks/content-fit-carousel/content-fit-carousel.php',
		'category'          => 'layout',
		'icon'              => 'admin-comments',
		'keywords'          => array( 'content slider', 'content fit slider', 'slider' ),
		//'enqueue_script'    => get_template_directory_uri() . '/blocks/content-fit-carousel/.js',
		'enqueue_assets' => function(){
			if (is_admin()) {
				wp_enqueue_script( 'cagov-js', get_template_directory_uri() . '/assets/js/cagov.core.min.js', array('jquery'), '', true );
			}

		},
	));
}

// Check if function exists and hook into setup.
if( function_exists('acf_register_block_type') ) {
	add_action('acf/init', 'register_acf_block_types');
}
