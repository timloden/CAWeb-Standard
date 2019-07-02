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
}

// Check if function exists and hook into setup.
if( function_exists('acf_register_block_type') ) {
	add_action('acf/init', 'register_acf_block_types');
}
