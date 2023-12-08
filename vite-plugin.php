<?php

/**
 * Plugin Name: Vite Plugin
 *
 */

// Enqueue the styles and scripts
add_action(
    'admin_enqueue_scripts',
    function ($hook) {
        wp_enqueue_style('vite-plugin-menu-style', plugin_dir_url(__FILE__) . 'style.css');

        // Load only on ?page=vite-plugin.
        if ('toplevel_page_vite-plugin' !== $hook) {
            return;
        }

        // Automatically load imported dependencies and assets version.
        $asset_file = include plugin_dir_path(__FILE__) . 'build/index.asset.php';

        // Enqueue CSS dependencies.
        foreach ($asset_file['dependencies'] as $style) {
            wp_enqueue_style($style);
        }

        wp_enqueue_style('vite-plugin-style', plugin_dir_url(__FILE__) . 'build/index.css', [], $asset_file['version']);
        wp_enqueue_script('vite-plugin-script', plugin_dir_url(__FILE__) . 'build/index.js', $asset_file['dependencies'], $asset_file['version'], true);
    }
);

add_action(
    'admin_menu',
    function () {
        // $icon_path = plugin_dir_path(__FILE__) . 'src/assets/vite.svg';
        // $svg = file_get_contents($icon_path);
        // $svg_string = base64_encode($svg);
        // $icon_url = "data:image/svg+xml;base64," . $svg_string;

        $icon_url = plugin_dir_url(__FILE__) . 'src/assets/vite.svg';
        // $icon_url = 'dashicons-schedule';

        // Create a new admin page for our app.
        add_menu_page(
            __('Vite Plugin', 'vite-plugin'),
            __('Vite Plugin', 'vite-plugin'),
            'manage_options',
            'vite-plugin',
            function () {
                echo '<div class="wrap"><div id="vite-plugin"></div></div>';
            },
            $icon_url,
            75
        );
    }
);
