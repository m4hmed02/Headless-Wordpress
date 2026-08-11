<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'custom_wordpress' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'C(1?k>f?j=Y*MI( >>Va7n!7~qLxn:z_#-feLVNu79@uS#EI:6=Ev;r_MzDhU$Fl' );
define( 'SECURE_AUTH_KEY',  'z<~a#wI1[kT}{= DZw]FG<aKBGVfd4/_Fy]n8Q!M1$:qC^?P@705a62JYZ3_{e:&' );
define( 'LOGGED_IN_KEY',    '_S S`T;ZS6.$dxx!JCA>M3ugKU!/q&E<Fefx1afib9Vu;KNrq,cDpUKLcTR:tA7)' );
define( 'NONCE_KEY',        'vF]Kp7|au4OA.)I8[SC_IOy}9m!2a(ZFB4_KH|4RY|%VO{|fL4m}9`D|B ZE=OcA' );
define( 'AUTH_SALT',        'rDWrpA9:%n-)(K*,LX/Im vLKO~8F_x~qorMT%3xo6q#vp{Y{)$fc766QIqNLlN3' );
define( 'SECURE_AUTH_SALT', ';V1n6NgC0!O>^l|p.!l(yj^xMkVEn:3K7QZX@PSTNhz_1C~?-0!u >4s2K*41i|k' );
define( 'LOGGED_IN_SALT',   'igbDELnN#TxhJZRWuAS30S<;Db| Wrn:mA^PwSyRxX;o TIU:=b$=ajI}j.s~fYE' );
define( 'NONCE_SALT',       'nvGnx}k$?oE1rq6)59(=uLLgB_AqN]~wDkivA;*Gggf_GsocNA/-~IUWNWP{s#8s' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
