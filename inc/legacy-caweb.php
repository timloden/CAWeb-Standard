<?php

// used in location module

function caweb_get_google_map_place_link($addr, $target = '_blank') {
	if (empty($addr)) {
		return;
	} elseif (is_string($addr)) {
		$addr = preg_split('/,/', $addr);
	}

	$addr = array_filter($addr);
	$addr = implode(", ", $addr);

	return sprintf('<a href="https://www.google.com/maps/place/%1$s" target="%2$s">%1$s</a>', $addr, $target);
}

// used in post list module

function caweb_return_posts($cats = array(), $tags = array(), $post_amount = -1, $orderby='post_date', $order = 'DESC') {
	$posts_array = array();

	$req_array = array();

	$args['category'] = ( ! empty($cats) ? (is_array($cats) ? implode(',', $cats) : $cats) : array());

	$args += array(
		'posts_per_page' => $post_amount,
		'orderby'           => $orderby,
		'order'             => $order,
		'post_type'         => 'post',
		'post_status'       => 'publish',
		'suppress_filters'  => true
	);

	$posts_array = get_posts($args);

	if ( ! empty($tags)) {
		foreach ($posts_array as $p=> $i) {
			//return posts tags
			$tag_ids = wp_get_post_tags($i->ID, array('fields' => 'ids'));

			if (empty($tag_ids)) {
				unset($posts_array[$p]);
			} else {
				// iterate through the tags
				$tags = ( ! is_array($tags) ? preg_split('/\D/', $tags) : $tags);
				foreach ($tag_ids as $k) {
					if ( ! in_array($k, $tags)) {
						unset($posts_array[$p]);
					}
				}
			}
		}
	}

	return $posts_array;
}

if ( ! function_exists('caweb_get_shortcode_from_content')) {
	function caweb_get_shortcode_from_content($con = "", $tag = "", $all_matches = false) {
		if (empty($con) || empty($tag)) {
			return array();
		}
		$results = array();
		$objects = array();

		$tag = is_array($tag) ? implode('|', $tag) : $tag;

		// Get Shortcode Tags from Con and save it to $results
		$pattern = sprintf('/\[(%1$s)[\d\s\w\S]+?\[\/\1\]|\[(%1$s)[\d\s\w\S]+? \/\]/', $tag);
		preg_match_all($pattern, $con, $results);
		// if there are no matches return an empty array
		if (empty($results)) {
			return array();
		}
		// if there are results save only the matches
		$matches = $results[0];

		// iterate thru each match
		foreach ($matches as $m => $match) {
			$obj = array();
			$attr = array();
			// matching tag can either be self-closing or not
			// non self-closing matching tags are results[1]
			// self-closing matching tags are results[2]
			// if non self-closing tag is empty assume self-closing
			$matching_tag =  ! empty($results[1][$m]) ? $results[1][$m] : $results[2][$m];

			// If the shortcode is a self closing tag, then it contains content in between its Shortcode Tags
			// Get content from shortcode
			preg_match(sprintf('/"\][\s\S]*\[\/(%1$s)/', $matching_tag), $match, $obj['content']);

			if ( ! empty($obj['content'])) {
				// substring the attributes, removing the content from the match
				$match = substr($match, 1, strpos($match, $obj['content'][0]));
				$obj['content'] = substr($obj['content'][0], 2, strlen($obj['content'][0]) - strlen($matching_tag) - 4);
			// If the shortcode is not a self closing tag, then it only contains one Shortcode Tag
			} else {
				$obj['content'] = '';
			}

			// Get Attributes from Shortcode
			preg_match_all('/\w*="[\w\s\d$:(),@?\'=+%!#\/\.\[\]\{\}-]*/', $match, $attr);
			foreach ($attr[0] as $a) {
				preg_match('/\w*/', $a, $key);
				$obj[$key[0]] = urldecode(substr($a, strlen($key[0]) + 2));
			}

			$objects[] =  (object) $obj;
		}

		if ($all_matches) {
			return $objects;
		}

		return  ! empty($objects) ? $objects[0] : array();
	}
}

// CAWeb 1.0 action for getting post meta

add_action('admin_post_caweb_attachment_post_meta', 'caweb_retrieve_attachment_post_meta');
add_action('admin_post_no_priv_caweb_attachment_post_meta', 'caweb_retrieve_attachment_post_meta');
function caweb_retrieve_attachment_post_meta() {
	if ( ! isset($_POST['imgs']) || empty($_POST['imgs']) || ! is_array($_POST['imgs'])) {
		return 0;
	}

	$alts = caweb_get_attachment_post_meta($_POST['imgs'], '_wp_attachment_image_alt');

	print json_encode($alts);
	exit();
}

function caweb_get_attachment_post_meta($image_url, $meta_key = '') {
	if (empty($image_url)) {
		return 0;
	}

	$query = array(
		'post_type'  => 'attachment',
		'fields'     => 'ids',
	);

	if (is_string($image_url)) {
		$query['meta_query'] = array(
			array(
				'key'     => '_wp_attached_file',
				'value'   => basename($image_url),
				'compare' => 'LIKE',
			),
		);

		$ids = get_posts($query);

		return ! empty($ids) ? get_post_meta($ids[0], $meta_key, true) : 0;
	} elseif (is_array($image_url)) {
		$imgs = array();

		foreach ($image_url as $i => $img) {
			$query['meta_query'] = array(
				array(
					'key'     => '_wp_attached_file',
					'value'   => basename($img),
					'compare' => 'LIKE',
				),
			);

			$ids = get_posts($query);

			if ( ! empty($ids)) {
				$imgs[] = get_post_meta($ids[0], $meta_key, true);
			}
		}

		return ! empty($imgs) ? $imgs : 0;
	}

	return 0;
}