<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://rahulpranami.co
 * @since      1.0.0
 *
 * @package    Threejs_Wp
 * @subpackage Threejs_Wp/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Threejs_Wp
 * @subpackage Threejs_Wp/admin
 * @author     Rahul Pranami <rahulpranami101@gmail.com>
 */
class Threejs_Wp_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles( $hook ) {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Threejs_Wp_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Threejs_Wp_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */
		$admin_css_url = plugin_dir_url( __FILE__ ) . 'css/';

		wp_enqueue_style( $this->plugin_name, $admin_css_url . 'threejs-wp-admin.css', array(), $this->version, 'all' );

		// Load only on ?page=threejs-wp-menu.
		if ('toplevel_page_threejs-wp-menu' === $hook) {

			// Load our style.css.
			wp_enqueue_style( 'threejs-wp-menu', $admin_css_url . 'threejs-wp-menu.css' );
		}

		if ('threejs-wp_page_threejs-wp-modals' === $hook) {
			wp_enqueue_style( 'threejs-wp-menu', $admin_css_url . 'threejs-wp-modals.css' );
		}

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts( $hook ) {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Threejs_Wp_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Threejs_Wp_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */
		$admin_js_url = plugin_dir_url( __FILE__ ) . 'js/';
		$admin_js_path = plugin_dir_path( __FILE__ ) . 'js/';

		wp_enqueue_script( $this->plugin_name, $admin_js_url . 'threejs-wp-admin.js', array( 'jquery' ), $this->version, false );

		// Load only on ?page=threejs-wp-menu.
		if ('toplevel_page_threejs-wp-menu' === $hook) {
			// Automatically load imported dependencies and assets version.
			$asset_file = require_once $admin_js_path . 'threejs-wp-menu/build/index.asset.php';

			// Enqueue CSS dependencies.
			foreach ($asset_file['dependencies'] as $style)
				wp_enqueue_style($style);

			// Load our app.js.
			wp_enqueue_script('threejs-wp-menu', $admin_js_url . 'threejs-wp-menu/build/index.js', $asset_file['dependencies'], $asset_file['version']);
		}

		// Load only on ?page=threejs-threejs-wp-modals.
		if ('threejs-wp_page_threejs-wp-modals' === $hook) {
			// Automatically load imported dependencies and assets version.
			$asset_file = require_once $admin_js_path . 'threejs-wp-modals/build/index.asset.php';

			// Enqueue CSS dependencies.
			foreach ($asset_file['dependencies'] as $style)
				wp_enqueue_style($style);

			// Load our app.js.
			wp_enqueue_script('threejs-wp-modals', $admin_js_url . 'threejs-wp-modals/build/index.js', $asset_file['dependencies'], $asset_file['version']);
		}
	}

	public static function allow_glb($mimes)
	{
		$mimes['glb'] = 'application/octet-stream';
		return $mimes;
	}

	public function option_page() {
		add_menu_page(
			__('ThreeJS WP', 'gutenberg'),
			__('ThreeJS WP', 'gutenberg'),
			'manage_options',
			'threejs-wp-menu',
			function () {
				echo '<div class="wrap"><div id="threejs-wp-app"></div></div>';
			},
			'dashicons-schedule',
			20
		);

		add_submenu_page(
			'threejs-wp-menu',
			'ThreeJS WP Modals',
			'ThreeJS WP Modals',
			'manage_options',
			'threejs-wp-modals',
			function(){
				echo '<div class="wrap"><div id="threejs-wp-modals"></div></div>';
			}
		);
	}

}
