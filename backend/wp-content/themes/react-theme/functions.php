<?php

function react_theme_assets() {

    wp_enqueue_style(
        'react-css',
        get_template_directory_uri() . '/assets/index-nqMpL4T3.css'
    );

    wp_enqueue_script(
        'react-js',
        get_template_directory_uri() . '/assets/index-Cj4CBBUw.js',
        array(),
        null,
        true
    );
}

add_action('wp_enqueue_scripts', 'react_theme_assets');


function react_add_module_type($tag, $handle, $src) {

    if ($handle === 'react-js') {
        return '<script type="module" src="' . esc_url($src) . '"></script>';
    }

    return $tag;
}

add_filter(
    'script_loader_tag',
    'react_add_module_type',
    10,
    3
);