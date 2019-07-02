<?php
/**
 * Panel Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */


// Create id attribute allowing for custom "anchor" value.
$id = 'panel-' . $block['id'];
if( !empty($block['anchor']) ) {
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$className = 'panel-module';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}
if( !empty($block['align']) ) {
    $className .= ' align' . $block['align'];
}

// Load values and assing defaults.
$panel_title = get_field('title') ?: 'Panel Title';
$panel_body = get_field('body') ?: 'Panel Content';
$panel_design = get_field('panel_design');
$show_button = get_field('show_button');
$button_text = get_field('button_text');
$button_link = get_field('button_link');
?>

<div id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($className); ?>">
	<div class="panel panel-<?php echo esc_attr($panel_design); ?>">
	    <div class="panel-heading">
	    	<?php if ($panel_design === 'standout highlight') : ?><span class="triangle"></span><?php endif; ?>
	        <h2><?php echo esc_attr($panel_title); ?></h2>
	        <?php if ($show_button) : ?>
	         <div class="options">
	            <a href="<?php echo esc_attr($button_link); ?>" class="btn btn-default"><?php echo esc_attr($button_text); ?></a>
	        </div>
	    	<?php endif; ?>
	    </div>
	    <div class="panel-body">
			<?php echo esc_attr($panel_body); ?>
	    </div>
	</div>
</div>
