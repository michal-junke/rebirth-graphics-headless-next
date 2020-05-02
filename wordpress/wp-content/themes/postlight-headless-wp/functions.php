<?php
/**
 * Theme for the Postlight Headless WordPress Starter Kit.
 *
 * Read more about this project at:
 * https://postlight.com/trackchanges/introducing-postlights-wordpress-react-starter-kit
 *
 * @package  Postlight_Headless_WP
 */

// Frontend origin.
require_once 'inc/frontend-origin.php';

// ACF commands.
require_once 'inc/class-acf-commands.php';

// Logging functions.
require_once 'inc/log.php';

// CORS handling.
require_once 'inc/cors.php';

// Admin modifications.
require_once 'inc/admin.php';

// Add Menus.
require_once 'inc/menus.php';

// Add Headless Settings area.
require_once 'inc/acf-options.php';

// Add GraphQL resolvers.
require_once 'inc/graphql/resolvers.php';

// Add thumbnails for posts
add_theme_support( 'post-thumbnails', 'post' );

/**
 * Add a Formatted Date to the WordPress REST API JSON Post Object
 *
 * https://adambalee.com/?p=1547
 */
add_action('rest_api_init', function() {
    register_rest_field(
        array('post'),
        'formatted_date',
        array(
            'get_callback'    => function() {
                return get_the_date('j M Y');
            },
            'update_callback' => null,
            'schema'          => null,
        )
    );
});

/**
 * Add tag names to WordPress REST API JSON Post object
 */
add_action('rest_api_init', function() {
    register_rest_field(
        array('post'),
        'tag_names',
        array(
            'get_callback' => function() {
                $tag_objs = get_the_tags();
                $tag_names = [];
                foreach($tag_objs as $tag) {
                    array_push($tag_names, $tag->name);
                }
                return $tag_names;
            },
            'update_callback' => null,
            'schema' => null,
        )
    );
});
/**
 * Change excerpt length
 * 
 */
function rbgr_excerpt_length($length){
    return 350;
    }
add_filter(‘excerpt_length’, ‘rbgr_excerpt_length’);

/**
 * Change excerpt dots
 */
function rbgr_excerpt_more( $more ) {
	return '...';
}
add_filter('excerpt_more', 'rbgr_excerpt_more');