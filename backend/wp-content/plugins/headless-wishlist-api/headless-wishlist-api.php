<?php

/**
 * Plugin Name: Headless Wishlist API
 * Description: Custom API for managing wishlists in a headless WordPress setup.
 * Author: Muhammad Ahmed
 * Version: 1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

// Create Wishlist Table on Activation & Check Existence on Init
register_activation_hook(__FILE__, 'headless_wishlist_create_table');
add_action('plugins_loaded', 'headless_wishlist_check_table_exists');

function headless_wishlist_create_table()
{
    global $wpdb;

    $table_name = $wpdb->prefix . 'wishlist_items';
    $charset_collate = $wpdb->get_charset_collate();

    // Strict dbDelta formatting (requires 2 spaces after PRIMARY KEY)
    $sql = "CREATE TABLE $table_name (
        id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        customer_id bigint(20) UNSIGNED NOT NULL,
        product_id bigint(20) UNSIGNED NOT NULL,
        created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
        PRIMARY KEY  (id),
        UNIQUE KEY customer_product (customer_id, product_id),
        KEY customer_id (customer_id),
        KEY product_id (product_id)
    ) $charset_collate;";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta($sql);
}

// Fallback to ensure table exists without needing manual re-activation
function headless_wishlist_check_table_exists()
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'wishlist_items';

    if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") !== $table_name) {
        headless_wishlist_create_table();
    }
}


// Register REST API Routes
add_action('rest_api_init', function () {

    // 1. ADD TO WISHLIST (POST)
    register_rest_route(
        'headless/v1',
        '/wishlist',
        array(
            'methods'             => 'POST',
            'callback'            => 'headless_add_to_wishlist',
            'permission_callback' => '__return_true',
        )
    );

    // 2. REMOVE FROM WISHLIST (DELETE)
    register_rest_route(
        'headless/v1',
        '/wishlist',
        array(
            'methods'             => 'DELETE',
            'callback'            => 'headless_remove_from_wishlist',
            'permission_callback' => '__return_true',
        )
    );

    // 3. GET WISHLIST ITEMS (GET)
    register_rest_route(
        'headless/v1',
        '/wishlist',
        array(
            'methods'             => 'GET',
            'callback'            => 'headless_get_wishlist',
            'permission_callback' => '__return_true',
        )
    );

});


// ==========================================
// CALLBACK: ADD TO WISHLIST
// ==========================================
function headless_add_to_wishlist(WP_REST_Request $request)
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'wishlist_items';

    $customer_id = $request->get_param('customer_id');
    $product_id  = $request->get_param('product_id');

    if (empty($customer_id)) {
        return new WP_Error('missing_customer_id', 'Customer ID is required.', array('status' => 400));
    }

    if (empty($product_id)) {
        return new WP_Error('missing_product_id', 'Product ID is required.', array('status' => 400));
    }

    $customer = get_user_by('id', $customer_id);
    if (!$customer) {
        return new WP_Error('customer_not_found', 'Customer not found.', array('status' => 404));
    }

    $product = get_post($product_id);
    if (!$product || $product->post_type !== 'product') {
        return new WP_Error('product_not_found', 'Product not found.', array('status' => 404));
    }

    $existing_item = $wpdb->get_var($wpdb->prepare(
        "SELECT id FROM $table_name WHERE customer_id = %d AND product_id = %d",
        $customer_id, $product_id
    ));

    if ($existing_item) {
        return new WP_Error('already_in_wishlist', 'Product is already in the wishlist.', array('status' => 409));
    }

    $inserted = $wpdb->insert(
        $table_name,
        array('customer_id' => (int) $customer_id, 'product_id' => (int) $product_id),
        array('%d', '%d')
    );

    if (!$inserted) {
        $db_error = !empty($wpdb->last_error) ? $wpdb->last_error : 'Failed to add product to wishlist.';
        return new WP_Error('wishlist_insert_failed', $db_error, array('status' => 500));
    }

    return new WP_REST_Response(
        array(
            'success' => true,
            'message' => 'Product added to wishlist.',
            'data'    => array(
                'wishlist_id' => (int) $wpdb->insert_id,
                'customer_id' => (int) $customer_id,
                'product_id'  => (int) $product_id
            )
        ), 201
    );
}

// ==========================================
// CALLBACK: REMOVE FROM WISHLIST
// ==========================================
function headless_remove_from_wishlist(WP_REST_Request $request)
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'wishlist_items';

    $customer_id = $request->get_param('customer_id');
    $product_id  = $request->get_param('product_id');

    if (empty($customer_id) || empty($product_id)) {
        return new WP_Error(
            'missing_parameters',
            'Both Customer ID and Product ID are required.',
            array('status' => 400)
        );
    }

    // Attempt to delete the record
    $deleted = $wpdb->delete(
        $table_name,
        array(
            'customer_id' => (int) $customer_id,
            'product_id'  => (int) $product_id
        ),
        array('%d', '%d')
    );

    if ($deleted === false) {
        return new WP_Error(
            'wishlist_delete_failed',
            'Database error while trying to remove product.',
            array('status' => 500)
        );
    }

    if ($deleted === 0) {
        return new WP_Error(
            'not_found_in_wishlist',
            'Product was not found in this customer\'s wishlist.',
            array('status' => 404)
        );
    }

    return new WP_REST_Response(
        array(
            'success' => true,
            'message' => 'Product removed from wishlist.'
        ), 200
    );
}

// ==========================================
// CALLBACK: GET WISHLIST ITEMS
// ==========================================
function headless_get_wishlist(WP_REST_Request $request)
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'wishlist_items';

    $customer_id = $request->get_param('customer_id');

    if (empty($customer_id)) {
        return new WP_Error(
            'missing_customer_id',
            'Customer ID is required.',
            array('status' => 400)
        );
    }

    // Fetch all product IDs for this customer
    $product_ids = $wpdb->get_col(
        $wpdb->prepare(
            "SELECT product_id FROM $table_name WHERE customer_id = %d ORDER BY created_at DESC",
            $customer_id
        )
    );

    // Cast IDs to integers so they are easier to handle in frontend
    $product_ids = array_map('intval', $product_ids);

    return new WP_REST_Response(
        array(
            'success'     => true,
            'customer_id' => (int) $customer_id,
            'data'        => $product_ids 
        ), 200
    );
}