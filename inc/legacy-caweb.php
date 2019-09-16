<?php
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