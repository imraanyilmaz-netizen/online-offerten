<?php
/**
 * Plugin Name: Online-Offerten Bewertungen
 * Plugin URI: https://online-offerten.ch
 * Description: Zeigen Sie Ihre verifizierten Kundenbewertungen von Online-Offerten.ch auf Ihrer WordPress-Webseite an.
 * Version: 1.0.0
 * Author: Online-Offerten.ch
 * Author URI: https://online-offerten.ch
 * License: GPL v2 or later
 * Text Domain: online-offerten-reviews
 */

if (!defined('ABSPATH')) {
    exit;
}

function oo_reviews_shortcode($atts) {
    $atts = shortcode_atts(array(
        'partner_id' => '',
        'type'       => 'list',
        'limit'      => '5',
        'theme'      => 'light',
        'lang'       => 'de',
    ), $atts, 'online_offerten_reviews');

    if (empty($atts['partner_id'])) {
        return '<p style="color:#dc2626;font-size:14px;">Online-Offerten Widget: Bitte geben Sie eine Partner-ID an.</p>';
    }

    $id   = esc_attr($atts['partner_id']);
    $type = esc_attr($atts['type']);

    $container_id = ($type === 'badge')
        ? 'online-offerten-badge'
        : 'online-offerten-reviews';

    $unique = 'oo-' . wp_unique_id();

    $html  = '<div id="' . $unique . '"';
    $html .= ' data-oo-partner-id="' . $id . '"';
    $html .= ' data-type="' . $type . '"';
    $html .= ' data-limit="' . esc_attr($atts['limit']) . '"';
    $html .= ' data-theme="' . esc_attr($atts['theme']) . '"';
    $html .= ' data-lang="' . esc_attr($atts['lang']) . '"';
    $html .= '></div>';

    if (!wp_script_is('oo-reviews-widget', 'enqueued')) {
        wp_enqueue_script(
            'oo-reviews-widget',
            'https://online-offerten.ch/widget/reviews.js',
            array(),
            '1.0.0',
            true
        );
    }

    return $html;
}
add_shortcode('online_offerten_reviews', 'oo_reviews_shortcode');

function oo_reviews_admin_page() {
    add_options_page(
        'Online-Offerten Bewertungen',
        'Online-Offerten',
        'manage_options',
        'online-offerten-reviews',
        'oo_reviews_settings_page'
    );
}
add_action('admin_menu', 'oo_reviews_admin_page');

function oo_reviews_settings_page() {
    ?>
    <div class="wrap">
        <h1>Online-Offerten Bewertungen</h1>
        <div class="card" style="max-width:700px;padding:20px;">
            <h2>Verwendung</h2>
            <p>Verwenden Sie den folgenden Shortcode, um Ihre Online-Offerten Bewertungen auf einer beliebigen Seite oder einem Beitrag anzuzeigen:</p>
            <code style="display:block;background:#f0f0f0;padding:12px;margin:12px 0;border-radius:4px;font-size:14px;">[online_offerten_reviews partner_id="IHRE_PARTNER_ID"]</code>

            <h3>Parameter</h3>
            <table class="widefat" style="max-width:600px;">
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Standard</th>
                        <th>Beschreibung</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><code>partner_id</code></td><td>—</td><td>Ihre Online-Offerten Partner-ID (Pflichtfeld)</td></tr>
                    <tr><td><code>type</code></td><td>list</td><td><code>list</code> = Vollständige Liste, <code>badge</code> = Kompaktes Badge</td></tr>
                    <tr><td><code>limit</code></td><td>5</td><td>Anzahl der angezeigten Bewertungen (max. 20)</td></tr>
                    <tr><td><code>theme</code></td><td>light</td><td><code>light</code> oder <code>dark</code></td></tr>
                    <tr><td><code>lang</code></td><td>de</td><td><code>de</code>, <code>fr</code> oder <code>it</code></td></tr>
                </tbody>
            </table>

            <h3 style="margin-top:20px;">Beispiele</h3>
            <code style="display:block;background:#f0f0f0;padding:8px;margin:8px 0;border-radius:4px;font-size:13px;">[online_offerten_reviews partner_id="abc123" type="badge" theme="dark"]</code>
            <code style="display:block;background:#f0f0f0;padding:8px;margin:8px 0;border-radius:4px;font-size:13px;">[online_offerten_reviews partner_id="abc123" type="list" limit="10" lang="fr"]</code>

            <p style="margin-top:20px;">
                <a href="https://online-offerten.ch" target="_blank" class="button button-primary">Online-Offerten.ch besuchen</a>
            </p>
        </div>
    </div>
    <?php
}
