<?php
/**
 * Customer Stories post type.
 *
 * @link https://codex.wordpress.org/Function_Reference/register_post_type
 */
function courses_post_type() {
	$labels = array(
		'name'               => _x( 'Courses', 'post type general name', 'caweb' ),
		'singular_name'      => _x( 'Course', 'post type singular name', 'caweb' ),
		'menu_name'          => _x( 'Courses', 'admin menu', 'caweb' ),
		'name_admin_bar'     => _x( 'Courses', 'add new on admin bar', 'caweb' ),
		'add_new'            => _x( 'Add New', 'Course', 'caweb' ),
		'add_new_item'       => __( 'Add New Course', 'caweb' ),
		'new_item'           => __( 'New Course', 'caweb' ),
		'edit_item'          => __( 'Edit Course', 'caweb' ),
		'view_item'          => __( 'View Course', 'caweb' ),
		'all_items'          => __( 'All Courses', 'caweb' ),
		'search_items'       => __( 'Search Courses', 'caweb' ),
		'parent_item_colon'  => __( 'Parent Courses:', 'caweb' ),
		'not_found'          => __( 'No Courses found.', 'caweb' ),
		'not_found_in_trash' => __( 'No Courses found in Trash.', 'caweb' ),
	);

	$args = array(
		'labels'             => $labels,
		'public'             => true,
		'show_in_rest'       => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => null,
		'menu_icon'          => 'dashicons-welcome-learn-more',
		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt' ),
		'taxonomies'         => array( 'category' ),
	);

	register_post_type( 'courses', $args );
	flush_rewrite_rules();
}

add_action( 'init', 'courses_post_type' );

function events_post_type() {
	$labels = array(
		'name'               => _x( 'Events', 'post type general name', 'caweb' ),
		'singular_name'      => _x( 'Event', 'post type singular name', 'caweb' ),
		'menu_name'          => _x( 'Events', 'admin menu', 'caweb' ),
		'name_admin_bar'     => _x( 'Events', 'add new on admin bar', 'caweb' ),
		'add_new'            => _x( 'Add New', 'Event', 'caweb' ),
		'add_new_item'       => __( 'Add New Event', 'caweb' ),
		'new_item'           => __( 'New Event', 'caweb' ),
		'edit_item'          => __( 'Edit Event', 'caweb' ),
		'view_item'          => __( 'View Event', 'caweb' ),
		'all_items'          => __( 'All Events', 'caweb' ),
		'search_items'       => __( 'Search Events', 'caweb' ),
		'parent_item_colon'  => __( 'Parent Events:', 'caweb' ),
		'not_found'          => __( 'No Events found.', 'caweb' ),
		'not_found_in_trash' => __( 'No Events found in Trash.', 'caweb' ),
	);

	$args = array(
		'labels'             => $labels,
		'public'             => true,
		'show_in_rest'       => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => null,
		'menu_icon'          => 'dashicons-location-alt',
		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt' ),
		'taxonomies'         => array( 'category' ),
	);

	register_post_type( 'events', $args );
	flush_rewrite_rules();
}

add_action( 'init', 'events_post_type' );

function jobs_post_type() {
	$labels = array(
		'name'               => _x( 'Jobs', 'post type general name', 'caweb' ),
		'singular_name'      => _x( 'Job', 'post type singular name', 'caweb' ),
		'menu_name'          => _x( 'Jobs', 'admin menu', 'caweb' ),
		'name_admin_bar'     => _x( 'Jobs', 'add new on admin bar', 'caweb' ),
		'add_new'            => _x( 'Add New', 'Job', 'caweb' ),
		'add_new_item'       => __( 'Add New Job', 'caweb' ),
		'new_item'           => __( 'New Job', 'caweb' ),
		'edit_item'          => __( 'Edit Job', 'caweb' ),
		'view_item'          => __( 'View Job', 'caweb' ),
		'all_items'          => __( 'All Jobs', 'caweb' ),
		'search_items'       => __( 'Search Jobs', 'caweb' ),
		'parent_item_colon'  => __( 'Parent Jobs:', 'caweb' ),
		'not_found'          => __( 'No Jobs found.', 'caweb' ),
		'not_found_in_trash' => __( 'No Jobs found in Trash.', 'caweb' ),
	);

	$args = array(
		'labels'             => $labels,
		'public'             => true,
		'show_in_rest'       => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => null,
		'menu_icon'          => 'dashicons-portfolio',
		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt' ),
		'taxonomies'         => array( 'post_tag' ),
	);

	register_post_type( 'jobs', $args );
	flush_rewrite_rules();
}

add_action( 'init', 'jobs_post_type' );

function publications_post_type() {
	$labels = array(
		'name'               => _x( 'Publications', 'post type general name', 'caweb' ),
		'singular_name'      => _x( 'Publication', 'post type singular name', 'caweb' ),
		'menu_name'          => _x( 'Publications', 'admin menu', 'caweb' ),
		'name_admin_bar'     => _x( 'Publications', 'add new on admin bar', 'caweb' ),
		'add_new'            => _x( 'Add New', 'Publication', 'caweb' ),
		'add_new_item'       => __( 'Add New Publication', 'caweb' ),
		'new_item'           => __( 'New Publication', 'caweb' ),
		'edit_item'          => __( 'Edit Publication', 'caweb' ),
		'view_item'          => __( 'View Publication', 'caweb' ),
		'all_items'          => __( 'All Publications', 'caweb' ),
		'search_items'       => __( 'Search Publications', 'caweb' ),
		'parent_item_colon'  => __( 'Parent Publications:', 'caweb' ),
		'not_found'          => __( 'No Publications found.', 'caweb' ),
		'not_found_in_trash' => __( 'No Publications found in Trash.', 'caweb' ),
	);

	$args = array(
		'labels'             => $labels,
		'public'             => true,
		'show_in_rest'       => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => null,
		'menu_icon'          => 'dashicons-book-alt',
		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt' ),
		'taxonomies'         => array( 'post_tag' ),
	);

	register_post_type( 'publications', $args );
	flush_rewrite_rules();
}

add_action( 'init', 'publications_post_type' );


function profile_post_type() {
	$labels = array(
		'name'               => _x( 'Profiles', 'post type general name', 'caweb' ),
		'singular_name'      => _x( 'Profile', 'post type singular name', 'caweb' ),
		'menu_name'          => _x( 'Profiles', 'admin menu', 'caweb' ),
		'name_admin_bar'     => _x( 'Profiles', 'add new on admin bar', 'caweb' ),
		'add_new'            => _x( 'Add New', 'Profile', 'caweb' ),
		'add_new_item'       => __( 'Add New Profile', 'caweb' ),
		'new_item'           => __( 'New Profile', 'caweb' ),
		'edit_item'          => __( 'Edit Profile', 'caweb' ),
		'view_item'          => __( 'View Profile', 'caweb' ),
		'all_items'          => __( 'All Profiles', 'caweb' ),
		'search_items'       => __( 'Search Profiles', 'caweb' ),
		'parent_item_colon'  => __( 'Parent Profiles:', 'caweb' ),
		'not_found'          => __( 'No Profiles found.', 'caweb' ),
		'not_found_in_trash' => __( 'No Profiles found in Trash.', 'caweb' ),
	);

	$args = array(
		'labels'             => $labels,
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => null,
		'menu_icon'          => 'dashicons-id',
		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt' ),
		'taxonomies'         => array(),
	);

	register_post_type( 'profiles', $args );
	flush_rewrite_rules();
}

add_action( 'init', 'profile_post_type' );
