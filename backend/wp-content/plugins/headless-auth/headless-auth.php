<?php
/**
 * Plugin Name: Headless Auth Api
 * Description: Custom authentication API for headless WordPress applications.
 * Version: 1.0
 */

if( !defined('ABSPATH') ) {
    exit;
}


add_action('rest_api_init', function(){
    register_rest_route('headless/v1', '/login', array(
        'methods' => 'POST',
        'callback' => 'headless_login',
        'permission_callback' => '__return_true',
    ));
});

function headless_login(WP_REST_Request $request) {

    $username = $request->get_param('username');
    $password = $request->get_param('password');

    if (empty($username) || empty($password)) {
        return new WP_Error(
            'missing_credentials',
            'Username and password are required.',
            ['status' => 400]
        );
    }

    $user = wp_authenticate($username, $password);

    if (is_wp_error($user)) {
        return new WP_Error(
            'invalid_credentials',
            'Invalid username or password.',
            ['status' => 401]
        );
    }

    return [
        'success'  => true,
        'user_id'  => $user->ID,
        'email'    => $user->user_email,
        'username' => $user->user_login,
        'role'     => $user->roles[0] ?? null,
    ];
}