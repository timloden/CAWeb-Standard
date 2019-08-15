<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package CAWeb_Standard
 */

$general_settings = get_field('general_settings', 'option');

if ($general_settings['organization_logo']) {
    $logo = $general_settings['organization_logo'];
    // if ($logo['alt'] != '') {
    //     $logo_alt = $logo['alt'];
    // } else {
    //     $logo_alt = get_bloginfo();
    // }
} else {
    $logo = get_template_directory_uri() . '/images/template-logo.png';
}

$logo_alt = get_bloginfo();

$favicon = $general_settings['fav_icon'];
$use_sticky_nav = $general_settings['use_sticky_navigation'];
$featured_search = $general_settings['show_search_on_front_page'];

$utility_header = get_field('utility_header', 'option');

$geo_locator = $utility_header['enable_geo_locator'];

$utility_contact_page = isset($utility_header['contact_us_page']) ? $utility_header['contact_us_page'] : false;

$use_utility_link_1 = isset($utility_header['use_custom_link_1']) ? $utility_header['use_custom_link_1'] : false;
$utility_link_1 = $utility_header['custom_link_1'];

$use_utility_link_2 = isset($utility_header['use_custom_link_2']) ? $utility_header['use_custom_link_2'] : false;
$utility_link_2 = $utility_header['custom_link_2'];

$use_utility_link_3 = isset($utility_header['use_custom_link_3']) ? $utility_header['use_custom_link_3'] : false;
$utility_link_3 = $utility_header['custom_link_3'];

$google_settings = get_field('google', 'option');
$search_engine_id = isset($google_settings['search_engine_id']) ? $google_settings['search_engine_id'] : false;
$meta_id = isset($google_settings['meta_id']) ? $google_settings['meta_id'] : false;

$google_translate = $google_settings['enable_google_translate'];

if ($google_settings['enable_google_translate'] == 'custom') {
    $google_custom_translate = get_field('google_custom_translate', 'option');

    $translate_url = isset($google_custom_translate['translate_page_url']) ? $google_custom_translate['translate_page_url'] : false;
    $translate_icon = isset($google_custom_translate['translate_icon']) ? $google_custom_translate['translate_icon'] : false;
}

$utility_header = get_field('utility_header', 'option');
$utility_home_link = $utility_header['home_link_in_utility_header'];
$facebook = get_field('facebook', 'option');
$twitter = get_field('twitter', 'option');
$flickr = get_field('flickr', 'option');
$facebook = get_field('facebook', 'option');
$pinterest = get_field('pinterest', 'option');
$youtube = get_field('youtube', 'option');
$instagram = get_field('instagram', 'option');
$linkedin = get_field('linkedin', 'option');
$rss = get_field('rss', 'option');
$share_email = get_field('share_via_email', 'option');

$custom_css = get_field('custom_css', 'option');
$custom_code = get_field('custom_javascript', 'option');

?>
<script>
console.log(GetCookie(dismissed-notifications));
</script>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <link alt="Fav Icon" rel="icon" href="<?php echo esc_url($favicon['url']); ?>">
    <link rel="apple-touch-icon" sizes="144x144" href="<?php echo esc_url(get_template_directory_uri());?>/assets/img/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="114x114" href="<?php echo esc_url(get_template_directory_uri());?>/assets/img/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="72x72" href="<?php echo esc_url(get_template_directory_uri());?>/assets/img/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" href="<?php echo esc_url(get_template_directory_uri());?>/assets/img/apple-touch-icon-57x57.png">

    <?php if ($meta_id) : ?>
        <meta name="google-site-verification" content="<?php echo esc_attr($meta_id); ?>" />
    <?php endif; ?>

    <?php wp_head(); ?>

    <?php if ($custom_css) : ?>
        <style type="text/css" media="screen">
        <?php echo($custom_css); ?>
        </style>
    <?php endif; ?>

    <?php if ($custom_code) : ?>
        <script>
        <?php echo($custom_code); ?>
        </script>
    <?php endif; ?>

</head>

<body <?php body_class(); ?>>
    

    <header role="banner" id="header" class="global-header <?php if($use_sticky_nav) { echo('fixed'); } ;?>">
        <div id="skip-to-content"><a href="#main-content">Skip to Main Content</a></div>

        <?php if(have_rows('alert_banners', 'options')) : ?>

            <?php while( have_rows('alert_banners', 'option') ): the_row(); ?>
                <?php
                $display_on = get_sub_field('display_on');
                $uniqueid = '#alert-' . get_row_index();
                if ($display_on == 'home_page' && is_front_page()) :
                    ?>
                    <?php get_template_part('template-parts/alert'); ?>
                <?php elseif ($display_on == 'all_pages') : ?>
                    <?php get_template_part('template-parts/alert'); ?>
                <?php endif; ?>

            <?php endwhile; ?>

        <?php endif; ?>

    <?php if ($geo_locator) : ?>
        <div class="location-settings section section-standout collapse collapsed " id="locationSettings">
            <div class="container p-y">
                <button type="button" class="close" data-toggle="collapse" data-target="#locationSettings" aria-expanded="false" aria-controls="locationSettings" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>

                <div class="form-group form-inline">
                    <label for="locationZipCode">Saving your location allows us to provide you with more relevant information.</label>
                    <input type="input" class="form-control" id="locationZipCode" placeholder="Zip Code">
                    <button type="button" class="btn btn-primary">Set Location</button>
                </div>
            </div>
        </div>
    <?php endif; ?>

        <!-- Utility Header -->
        <div class="utility-header">
            <div class="container <?php //if($google_translate == 'standard') { echo('translate-standard'); } ;?>">
               <div class="group flex-row">
                    <div class="social-media-links">

					<div class="header-cagov-logo">
						<a href="https://www.ca.gov"><span class="sr-only">CA.gov</span><img src="<?php echo esc_url(get_template_directory_uri());?>/assets/img/Ca-Gov-Logo-Gold.svg" class="pos-rel" alt="CA.gov logo" aria-hidden="true"></a>
					</div>

                    <?php if ($utility_home_link) : ?>
                        <a href="/" class="ca-gov-icon-home"><span class="sr-only">Home</span></a>
                    <?php endif; ?>

        <?php if ($facebook['url'] && $facebook['show_in_header'] == 1) : ?>
                                <a href="<?php echo esc_url($facebook['url']);?>" class="ca-gov-icon-facebook"><span class="sr-only">Facebook</span></a>
        <?php endif; ?>

        <?php if ($twitter['url'] && $twitter['show_in_header'] == 1) : ?>
                                <a href="<?php echo esc_url($twitter['url']);?>" class="ca-gov-icon-twitter"><span class="sr-only">Twitter</span></a>
        <?php endif; ?>

        <?php if ($flickr['url'] && $flickr['show_in_header'] == 1) : ?>
                                <a href="<?php echo esc_url($flickr['url']);?>" class="ca-gov-icon-flickr"><span class="sr-only">Flickr</span></a>
        <?php endif; ?>

        <?php if ($pinterest['url'] && $pinterest['show_in_header'] == 1) : ?>
                                <a href="<?php echo esc_url($pinterest['url']);?>" class="ca-gov-icon-pinterest"><span class="sr-only">Pinterest</span></a>
        <?php endif; ?>

        <?php if ($youtube['url'] && $youtube['show_in_header'] == 1) : ?>
                                <a href="<?php echo esc_url($youtube['url']);?>" class="ca-gov-icon-youtube"><span class="sr-only">YouTube</span></a>
        <?php endif; ?>

        <?php if ($instagram['url'] && $instagram['show_in_header'] == 1) : ?>
                                <a href="<?php echo esc_url($instagram['url']);?>" class="ca-gov-icon-instagram"><span class="sr-only">Instagram</span></a>
        <?php endif; ?>

        <?php if ($linkedin['url'] && $linkedin['show_in_header'] == 1) : ?>
                                <a href="<?php echo esc_url($linkedin['url']);?>" class="ca-gov-icon-linkedin"><span class="sr-only">LinkedIn</span></a>
        <?php endif; ?>

        <?php if ($rss['url'] && $rss['show_in_header'] == 1) : ?>
                                <a href="<?php echo esc_url($rss['url']);?>" class="ca-gov-icon-rss"><span class="sr-only">RSS</span></a>
        <?php endif; ?>

        <?php if ($share_email['show_in_header'] == 1) : ?>
                                <a href="mailto:?subject=<?php bloginfo('name'); ?>&body=<?php echo site_url(); ?>" class="ca-gov-icon-email"><span class="sr-only">Email</span></a>
        <?php endif; ?>


                    </div>

                    <div class="settings-links">
        <?php if ($use_utility_link_1) : ?>
                            <a href="<?php echo esc_url($utility_link_1['custom_link_1_url']); ?>"<?php if ($utility_link_1['open_custom_link_1_in_new_tab'] == 1) : ?> target="_blank" <?php 
                           endif; ?> ><?php echo esc_attr($utility_link_1['custom_link_1_text']); ?></a>

        <?php endif; ?>

                    <?php if ($use_utility_link_2) : ?>
                            <a href="<?php echo esc_url($utility_link_2['custom_link_2_url']); ?>"<?php if ($utility_link_2['open_custom_link_2_in_new_tab'] == 1) : ?> target="_blank" <?php 
                           endif; ?>><?php echo esc_attr($utility_link_2['custom_link_2_text']); ?></a>
                    <?php endif; ?>

                    <?php if ($use_utility_link_3) : ?>
                            <a href="<?php echo esc_url($utility_link_3['custom_link_3_url']); ?>"<?php if ($utility_link_3['open_custom_link_3_in_new_tab'] == 1) : ?> target="_blank" <?php 
                           endif; ?>><?php echo esc_attr($utility_link_3['custom_link_3_text']); ?></a>
                    <?php endif; ?>

                        <?php if ($utility_contact_page) : ?>
                            <a href="<?php echo esc_url($utility_contact_page);?>"><span class="ca-gov-icon-contact-us" aria-hidden="true"></span>Contact Us</a>
                        <?php endif; ?>

                        <button class="btn btn-xs btn-primary" data-toggle="collapse" data-target="#siteSettings" aria-expanded="false" aria-controls="siteSettings"><span class="ca-gov-icon-gear" aria-hidden="true"></span> Settings</button>

        <?php if ($geo_locator) : ?>
                            <div class="utility-geo-locator"><a role="button" aria-expanded="false" aria-controls="locationSettings" class="geo-lookup"><span class="ca-gov-icon-compass" aria-hidden="true"></span > <span class="located-city-name"></span></a></div>
        <?php endif; ?>

        <?php if ($google_translate =='custom') : ?>
                            <a id="caweb-gtrans-custom" target="_blank" href="<?php echo esc_url($translate_url); ?>">
                                <span class="ca-gov-<?php echo esc_attr($translate_icon); ?>"></span> Translate</a>
        <?php endif; ?>

                        <?php if ($google_translate =='standard') : ?>
                            <div class="standard-translate" id="google_translate_element"></div>
                        <?php endif; ?>
                    </div>

        <?php if ($google_translate =='standard') : ?>
<!--                     <div class="quarter standard-translate" id="google_translate_element"></div>
         -->                <?php endif; ?>

                </div>
            </div>
        </div>

        <!-- Settings Bar -->
        <div class="site-settings section section-standout collapse collapsed" role="alert" id="siteSettings">
			<div class="container  p-y">
				<div class="btn-group btn-group-justified-sm" role="group" aria-label="contrastMode">
					<div class="btn-group"><button type="button" class="btn btn-standout disableHighContrastMode">Default</button></div>
					<div class="btn-group"><button type="button" class="btn btn-standout enableHighContrastMode">High Contrast</button></div>
				</div>

				<div class="btn-group" role="group" aria-label="textSizeMode">
					<div class="btn-group"><button type="button" class="btn btn-standout resetTextSize">Reset</button></div>
					<div class="btn-group"><button type="button" class="btn btn-standout increaseTextSize"><span class="hidden-xs">Increase Font Size</span><span class="visible-xs">Font <span class="sr-only">Increase</span><span class="ca-gov-icon-plus-line font-size-sm" aria-hidden="true"></span></span></button></div>
					<div class="btn-group"><button type="button" class="btn btn-standout decreaseTextSize"><span class="hidden-xs">Decrease Font Size</span><span class="visible-xs">Font <span class="sr-only">Decrease</span><span class="ca-gov-icon-minus-line font-size-sm" aria-hidden="true"></span></span></button></div>
				</div>
				<button type="button" class="close" data-toggle="collapse" data-target="#siteSettings" aria-expanded="false" aria-controls="siteSettings" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			</div>
		</div>

        <!-- Branding -->
          <div class="branding">
            <div class="header-organization-banner">
                <a href="/">
                    <img src="<?php echo esc_url($logo['url']); ?>" alt="<?php echo esc_attr($logo_alt); ?>" />
                </a>
            </div>
        </div>
        <!-- Mobile Controls -->
        <div class="mobile-controls">
            <span class="mobile-control-group mobile-header-icons">
                <!-- Add more mobile controls here. These will be on the right side of the mobile page header section -->
            </span>
            <div class="mobile-control-group main-nav-icons float-right">
                <button class="mobile-control toggle-search float-left m-l">
                    <span class="ca-gov-icon-search hidden-print" aria-hidden="true"></span><span class="sr-only">Search</span>
                </button>
                <button id="nav-icon3" class="mobile-control toggle-menu" aria-expanded="false" aria-controls="navigation">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span class="sr-only">Menu</span>
                </button>
            </div>
        </div>

        <div class="navigation-search">

            <?php
            if(has_nav_menu('header-menu')) {
                get_template_part('template-parts/header-menu');
            }
            ?>

            <?php if ($search_engine_id) : ?>

            <div id="head-search" class="search-container <?php if($featured_search && !is_page_template('page-search.php') && is_front_page()) { echo('featured-search'); 
} ;?> hidden-print in play-animation">

                <?php if (!is_page_template('page-search.php')) : ?>

                    <div class="container">
                        <form id="Search" class="pos-rel" action="<?php echo site_url('serp');?>">
                            <span class="sr-only" id="SearchInput">Custom Google Search</span>
                            <input type="text" id="q" name="q" aria-labelledby="SearchInput" placeholder="Search this website" class="search-textfield height-50 border-0 p-x-sm w-100" />
							<button type="submit" class="pos-abs gsc-search-button top-0 width-50 height-50 border-0 bg-transparent"><span class="ca-gov-icon-search font-size-30 color-gray" aria-hidden="true"></span><span class="sr-only">Submit</span></button>
        					<div class="width-50 height-50 close-search-btn"><button class="close-search gsc-clear-button width-50 height-50 border-0 bg-transparent pos-rel" type="reset"><span class="sr-only">Close Search</span><span class="ca-gov-icon-close-mark" aria-hidden="true"></span></button></div>                        
						</form>
                    </div>

                <?php endif; ?>

        <?php else : ?>

            <div id="head-search" class="search-container <?php if($featured_search && !is_page_template('page-search.php') && is_front_page()) { echo('featured-search'); 
} ;?> hidden-print in play-animation">
					<div class="container">
                        <form id="Search" class="pos-rel" action="<?php echo site_url('serp');?>">
                            <span class="sr-only" id="SearchInput">Custom Google Search</span>
                            <input type="text" id="q" name="q" aria-labelledby="SearchInput" placeholder="Search this website" class="search-textfield height-50 border-0 p-x-sm w-100" />
							<button type="submit" class="pos-abs gsc-search-button top-0 width-50 height-50 border-0 bg-transparent"><span class="ca-gov-icon-search font-size-30 color-gray" aria-hidden="true"></span><span class="sr-only">Submit</span></button>
        					<div class="width-50 height-50 close-search-btn"><button class="close-search gsc-clear-button width-50 height-50 border-0 bg-transparent pos-rel" type="reset"><span class="sr-only">Close Search</span><span class="ca-gov-icon-close-mark" aria-hidden="true"></span></button></div>                        
						</form>
                    </div>

            </div>

        <?php endif; ?>

        </div>


        <div class="header-decoration"></div>
    </header>

<div id="main-content" class="main-content">
