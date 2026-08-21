<?php

/**
 * Plugin Name: Headless Order Cart Token API
 * Description: Links WooCommerce Store API orders to Cart Tokens and Customer IDs, providing order lookup APIs.
 * Author: Muhammad Ahmed
 * Version: 1.2.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/*
|--------------------------------------------------------------------------
| META KEYS
|--------------------------------------------------------------------------
*/

define('HOCT_CART_TOKEN_META', '_headless_cart_token');
define('HOCT_DEBUG_META', '_headless_debug_cart_token');
define('HOCT_CUSTOMER_ID_META', '_headless_customer_id');

/*
|--------------------------------------------------------------------------
| CHECK WOOCOMMERCE
|--------------------------------------------------------------------------
*/

add_action('plugins_loaded', 'hoct_check_woocommerce');

function hoct_check_woocommerce()
{
    if (!class_exists('WooCommerce')) {
        add_action('admin_notices', function () {
            echo '<div class="notice notice-error">';
            echo '<p><strong>Headless Order Cart Token API:</strong> WooCommerce is not active.</p>';
            echo '</div>';
        });
    }
}

/*
|--------------------------------------------------------------------------
| STORE API CHECKOUT HOOK
|--------------------------------------------------------------------------
*/

add_action(
    'woocommerce_store_api_checkout_update_order_from_request',
    'hoct_capture_cart_token',
    999,
    2
);

function hoct_capture_cart_token($order, $request)
{
    if (!$order instanceof WC_Order || !$request instanceof WP_REST_Request) {
        return;
    }

    // 1. Save Cart Token in its own meta row
    $cart_token = $request->get_header('Cart-Token');
    if (empty($cart_token)) {
        $cart_token = $request->get_header('cart-token');
    }

    if (!empty($cart_token)) {
        $cart_token = sanitize_text_field($cart_token);
        $order->update_meta_data(HOCT_CART_TOKEN_META, $cart_token);
    }

    $debug_value = !empty($cart_token) ? $cart_token : 'HOOK_FIRED_BUT_NO_CART_TOKEN';
    $order->update_meta_data(HOCT_DEBUG_META, $debug_value);


    // 2. Save Customer ID in its own meta row (Always created: ID if logged-in, "" if guest)
    $customer_id = $request->get_header('Customer-Id');
    if (empty($customer_id)) {
        $customer_id = $request->get_header('customer-id');
    }

    $final_customer_id = !empty($customer_id) ? sanitize_text_field($customer_id) : '';

    // Har order ke liye _headless_customer_id ki row bane gi
    $order->update_meta_data(HOCT_CUSTOMER_ID_META, $final_customer_id);

    // Native WooCommerce order link (sirf tab jab user logged-in ho)
    if (!empty($final_customer_id)) {
        $order->set_customer_id(intval($final_customer_id));
    }

    $order->save();

    error_log(
        'HOCT: Order ID: ' . $order->get_id() . 
        ' | Cart Token: ' . ($cart_token ?: 'EMPTY') . 
        ' | Customer ID: ' . ($final_customer_id !== '' ? $final_customer_id : 'EMPTY_STRING')
    );
}

/*
|--------------------------------------------------------------------------
| REGISTER REST ROUTES
|--------------------------------------------------------------------------
*/

add_action('rest_api_init', 'hoct_register_routes');

function hoct_register_routes()
{
    $args = array(
        'cart_token' => array(
            'required' => false, 
            'type' => 'string',
            'sanitize_callback' => 'sanitize_text_field',
        ),
        'customer_id' => array(
            'required' => false, 
            'type' => 'string',
            'sanitize_callback' => 'sanitize_text_field',
        ),
    );

    register_rest_route(
        'headless/v1',
        '/order-by-cart-token',
        array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => 'hoct_get_order_by_cart_token',
            'permission_callback' => '__return_true',
            'args' => $args,
        )
    );

    register_rest_route(
        'headless/v1',
        '/orders-by-cart-token',
        array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => 'hoct_get_orders_by_cart_token',
            'permission_callback' => '__return_true',
            'args' => $args,
        )
    );
}

/*
|--------------------------------------------------------------------------
| GET SINGLE ORDER
|--------------------------------------------------------------------------
*/

function hoct_get_order_by_cart_token(WP_REST_Request $request)
{
    $cart_token = $request->get_param('cart_token');
    $customer_id = $request->get_param('customer_id'); 

    if (empty($cart_token) && empty($customer_id)) {
        return new WP_Error(
            'missing_identifiers',
            'Cart token or Customer ID is required.',
            array('status' => 400)
        );
    }

    $query_args = array(
        'limit' => 1,
        'orderby' => 'date',
        'order' => 'DESC',
    );

    if (!empty($customer_id)) {
        $query_args['customer_id'] = $customer_id;
    } else {
        $query_args['meta_key'] = HOCT_CART_TOKEN_META;
        $query_args['meta_value'] = $cart_token;
    }

    $orders = wc_get_orders($query_args);

    if (empty($orders)) {
        return new WP_Error(
            'order_not_found',
            'No order found for this identifier.',
            array('status' => 404)
        );
    }

    return hoct_format_order($orders[0]);
}

/*
|--------------------------------------------------------------------------
| GET ALL ORDERS
|--------------------------------------------------------------------------
*/

function hoct_get_orders_by_cart_token(WP_REST_Request $request)
{
    $cart_token = $request->get_param('cart_token');
    $customer_id = $request->get_param('customer_id'); 

    if (empty($cart_token) && empty($customer_id)) {
        return new WP_Error(
            'missing_identifiers',
            'Cart token or Customer ID is required.',
            array('status' => 400)
        );
    }

    $query_args = array(
        'limit' => -1,
        'orderby' => 'date',
        'order' => 'DESC',
    );

    if (!empty($customer_id)) {
        $query_args['customer_id'] = $customer_id;
    } else {
        $query_args['meta_key'] = HOCT_CART_TOKEN_META;
        $query_args['meta_value'] = $cart_token;
    }

    $orders = wc_get_orders($query_args);
    $data = array();

    foreach ($orders as $order) {
        $data[] = hoct_format_order_data($order);
    }

    return new WP_REST_Response(
        array(
            'success' => true,
            'count' => count($data),
            'data' => $data,
        ),
        200
    );
}

/*
|--------------------------------------------------------------------------
| FORMAT SINGLE ORDER RESPONSE
|--------------------------------------------------------------------------
*/

function hoct_format_order(WC_Order $order)
{
    return new WP_REST_Response(
        array(
            'success' => true,
            'data' => hoct_format_order_data($order),
        ),
        200
    );
}

/*
|--------------------------------------------------------------------------
| FORMAT ORDER DATA
|--------------------------------------------------------------------------
*/

function hoct_format_order_data(WC_Order $order)
{
    $items = array();

    foreach ($order->get_items() as $item_id => $item) {

        $product = $item->get_product();

        $items[] = array(
            'item_id' => $item_id,
            'product_id' => $item->get_product_id(),
            'variation_id' => $item->get_variation_id(),
            'name' => $item->get_name(),
            'quantity' => $item->get_quantity(),
            'subtotal' => $item->get_subtotal(),
            'total' => $item->get_total(),
            'price' => $product ? $product->get_price() : null,
            'image' => $product ? wp_get_attachment_image_url($product->get_image_id(), 'thumbnail') : null,
        );
    }

    return array(

        /*
         * Order
         */
        'order_id' => $order->get_id(),
        'order_number' => $order->get_order_number(),
        'status' => $order->get_status(),
        'status_label' => wc_get_order_status_name($order->get_status()),

        /*
         * Currency
         */
        'currency' => $order->get_currency(),
        'currency_symbol' => get_woocommerce_currency_symbol($order->get_currency()),

        /*
         * Prices
         */
        'subtotal' => $order->get_subtotal(),
        'shipping_total' => $order->get_shipping_total(),
        'discount_total' => $order->get_discount_total(),
        'tax_total' => $order->get_total_tax(),
        'total' => $order->get_total(),

        /*
         * Payment
         */
        'payment_method' => $order->get_payment_method(),
        'payment_method_title' => $order->get_payment_method_title(),

        /*
         * Date
         */
        'date_created' => $order->get_date_created() ? $order->get_date_created()->date('Y-m-d H:i:s') : null,

        /*
         * Billing
         */
        'billing' => array(
            'first_name' => $order->get_billing_first_name(),
            'last_name' => $order->get_billing_last_name(),
            'email' => $order->get_billing_email(),
            'phone' => $order->get_billing_phone(),
            'address_1' => $order->get_billing_address_1(),
            'address_2' => $order->get_billing_address_2(),
            'city' => $order->get_billing_city(),
            'state' => $order->get_billing_state(),
            'postcode' => $order->get_billing_postcode(),
            'country' => $order->get_billing_country(),
        ),

        /*
         * Shipping
         */
        'shipping' => array(
            'first_name' => $order->get_shipping_first_name(),
            'last_name' => $order->get_shipping_last_name(),
            'address_1' => $order->get_shipping_address_1(),
            'address_2' => $order->get_shipping_address_2(),
            'city' => $order->get_shipping_city(),
            'state' => $order->get_shipping_state(),
            'postcode' => $order->get_shipping_postcode(),
            'country' => $order->get_shipping_country(),
        ),

        /*
         * Products
         */
        'items' => $items,
    );
}