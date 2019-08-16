<?php
function caweb_google_translate_func() {
    return '<div id="google_translate_element" class="custom-translate"></div>';
}
add_shortcode('caweb_google_translate', 'caweb_google_translate_func');