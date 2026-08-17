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
define( 'DB_NAME', 'headless_wordpress' );

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
define( 'AUTH_KEY',         'EK;9~wO:S5$fo#QFzMadVm]!^n+.~k{(&&%<k?jZGVeaPoAX,qb|OWS8bUN}(I(K' );
define( 'SECURE_AUTH_KEY',  'K6oAFJK@D6QyQDz;of@{U)8Veom}jTKZu6UO.B{GLbS.jPP?0ds{I,L9=}k)hhjT' );
define( 'LOGGED_IN_KEY',    'x_QXnM<+ PB#^*f%hekJoi4A%_|s%o`!tKOWO;Da7(a&MJ~?+7TH<RsFT)m3M< A' );
define( 'NONCE_KEY',        '6 d--Ei{0U/*$PYt,6op)t1boz%OiM,AtAhYQ1@UiiCx2LJ&+F{FJXLZ^j@Qj;}3' );
define( 'AUTH_SALT',        '8tRSsJx/qCF|TUl*jf$|B3fzgM#V8-kKBtOCsPs`kNH~>H9(kGLsX8[&!+dyk,_E' );
define( 'SECURE_AUTH_SALT', 'sqp*C/XirEAu^Y[(_H3$+ R+Rj6{Ire+t<xV,@)_k()W2WcM34Ml-m}Jx.l[W>B4' );
define( 'LOGGED_IN_SALT',   '][lf-^TAJsYD607r)<BX{H^;YDdRfrkzf<q.uH-i t6q.o0q~-+[?L@GQr OX@Jj' );
define( 'NONCE_SALT',       '[d-rlAZC_`bwv.AN?Mp?XXG1I~D1Ey!>@LuEggJ%<L!|[-l?wniF>$n2cec34]M ' );

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
