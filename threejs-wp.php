<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://rahulpranami.co
 * @since             1.0.0
 * @package           Threejs_Wp
 *
 * @wordpress-plugin
 * Plugin Name:       ThreeJS WP
 * Plugin URI:        https://rahulpranami.co/plugins/threejs-wp
 * Description:       This is a plugin to integrate ThreeJS Library in WordPress.
 * Version:           1.0.0
 * Author:            Rahul Pranami
 * Author URI:        https://rahulpranami.co/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       threejs-wp
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'THREEJS_WP_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-threejs-wp-activator.php
 */
function activate_threejs_wp() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-threejs-wp-activator.php';
	Threejs_Wp_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-threejs-wp-deactivator.php
 */
function deactivate_threejs_wp() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-threejs-wp-deactivator.php';
	Threejs_Wp_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_threejs_wp' );
register_deactivation_hook( __FILE__, 'deactivate_threejs_wp' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-threejs-wp.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_threejs_wp() {

	$plugin = new Threejs_Wp();
	$plugin->run();

}
run_threejs_wp();
