<?php
// Enqueue Theme Styles and Vanilla JS Scripts
function living_nairobi_enqueue_assets() {
    // Theme Main Stylesheet
    wp_enqueue_style('living-nairobi-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // Custom Google Fonts (e.g., Playfair Display & Inter)
    wp_enqueue_style('living-nairobi-fonts', 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap', array(), null);

    // Main JavaScript Interactivity File
    wp_enqueue_script('living-nairobi-scripts', get_template_directory_uri() . '/scripts.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'living_nairobi_enqueue_assets');

// Theme Support Settings
function living_nairobi_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    
    // Register Dynamic Navigation Menus
    register_nav_menus(array(
        'primary-menu' => __('Primary Navigation Header', 'living-nairobi'),
        'footer-menu'  => __('Footer Navigation Links', 'living-nairobi'),
    ));
}
add_action('after_setup_theme', 'living_nairobi_theme_setup');