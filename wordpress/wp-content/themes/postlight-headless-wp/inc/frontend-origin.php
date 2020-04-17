<?php
/**
 * Frontend origin helper function.
 *
 * @package  Postlight_Headless_WP
 */

/**
 * Placeholder function for determining the frontend origin.
 *
 * @TODO Determine the headless client's URL based on the current environment.
 *
 * @return str Frontend origin URL, i.e., http://localhost:3000.
 */
function get_frontend_origin() {
        // allow both dev and production frontend to connect to WP
        $origin = get_http_origin();
        if ($origin && in_array( $origin, array(
            'http://localhost:3000',
            'http://localhost:3001',
            'http://rebirth.michaljunke.com',
            'https://rebirth.michaljunke.com'
        ))) {
            return $origin;
        }
}
