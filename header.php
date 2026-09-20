<!DOCTYPE html>
<html lang="<?php echo get_bloginfo('language'); ?>">
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?php wp_title('|', true, 'right'); ?><?php bloginfo('name'); ?></title>
<link rel="profile" href="https://gmpg.org/xfn/11">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

  <!-- Top Bar -->
  <div class="topbar">
    <div class="wrap">
      <div class="topbar-left"><?php bloginfo('description'); /* Exploring Life, Culture and People across Kenya and beyond. */ ?></div>
      <div class="topbar-right">
        <div class="icons">
          <?php if (get_theme_mod('social_instagram')) : ?>
          <a href="<?php echo esc_url(get_theme_mod('social_instagram')); ?>" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 2.1.26 2.7.5.7.27 1.2.6 1.7 1.1.5.5.9 1 1.1 1.7.24.6.44 1.5.5 2.7.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.26 2.1-.5 2.7-.27.7-.6 1.2-1.1 1.7-.5.5-1 .9-1.7 1.1-.6.24-1.5.44-2.7.5-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-2.1-.26-2.7-.5-.7-.27-1.2-.6-1.7-1.1-.5-.5-.9-1-1.1-1.7-.24-.6-.44-1.5-.5-2.7C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.26-2.1.5-2.7.27-.7.6-1.2 1.1-1.7.5-.5 1-.9 1.7-1.1.6-.24 1.5-.44 2.7-.5C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52 0-4.76.07-1.03.05-1.6.22-1.97.36-.5.19-.85.42-1.22.79-.37.37-.6.72-.79 1.22-.14.37-.31.94-.36 1.97C2.8 9.44 2.8 9.81 2.8 12.96s0 3.52.1 4.76c.05 1.03.22 1.6.36 1.97.19.5.42.85.79 1.22.37.37.72.6 1.22.79.37.14.94.31 1.97.36 1.24.06 1.61.07 4.76.07s3.52 0 4.76-.07c1.03-.05 1.6-.22 1.97-.36.5-.19.85-.42 1.22-.79.37-.37.6-.72.79-1.22.14-.37.31-.94.36-1.97.06-1.24.07-1.61.07-4.76s0-3.52-.07-4.76c-.05-1.03-.22-1.6-.36-1.97-.19-.5-.42-.85-.79-1.22-.37-.37-.72-.6-1.22-.79-.37-.14-.94-.31-1.97-.36C15.52 4 15.15 4 12 4z"/></svg></a>
          <?php endif; ?>
          <?php if (get_theme_mod('social_facebook')) : ?>
          <a href="<?php echo esc_url(get_theme_mod('social_facebook')); ?>" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H17V3.7C16.5 3.6 15.6 3.5 14.6 3.5c-2.5 0-4.2 1.5-4.2 4.3v2.1H7.6V13h2.8v8h3.1z"/></svg></a>
          <?php endif; ?>
          <?php if (get_theme_mod('social_tiktok')) : ?>
          <a href="<?php echo esc_url(get_theme_mod('social_tiktok')); ?>" aria-label="TikTok"><svg viewBox="0 0 24 24"><path d="M16.6 5.8c-.9-.9-1.4-2.2-1.4-3.5h-2.9v13.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5c.3 0 .5 0 .8.1V10.4c-.3 0-.5-.1-.8-.1-3 0-5.4 2.4-5.4 5.4S7.3 21 10.3 21s5.4-2.4 5.4-5.4V9c1.1.8 2.5 1.3 3.9 1.3V7.4c-1 0-2-.4-2.7-1.1z"/></svg></a>
          <?php endif; ?>
          <?php if (get_theme_mod('social_youtube')) : ?>
          <a href="<?php echo esc_url(get_theme_mod('social_youtube')); ?>" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.1 5 12 5 12 5s-6.1 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.9 2 12 2 12s0 3.1.4 4.8c.2.9.9 1.6 1.8 1.8C5.9 19 12 19 12 19s6.1 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8zM10 15V9l5.2 3-5.2 3z"/></svg></a>
          <?php endif; ?>
        </div>
        <a href="<?php echo esc_url(home_url('/subscribe')); ?>" class="subscribe-link">Subscribe</a>
        <a href="#" class="search-link" id="searchToggle" aria-label="Search"><svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 10-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0a4.5 4.5 0 110-9 4.5 4.5 0 010 9z"/></svg></a>
      </div>
    </div>
  </div>

  <!-- Header -->
  <header class="main">
    <div class="navwrap">
      <div class="nav-left">
        <button class="hamburger" id="hamburgerBtn" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
        <?php
        wp_nav_menu(array(
            'theme_location' => 'primary-menu-left',
            'container'      => 'nav',
            'container_class'=> 'nav-links',
            'menu_class'     => 'nav-menu-left',
            'fallback_cb'    => false,
            'depth'          => 1,
        ));
        ?>
      </div>
      <div class="logo">
        <a href="<?php echo esc_url(home_url('/')); ?>">
          <?php if (has_custom_logo()) : ?>
            <?php the_custom_logo(); ?>
          <?php else : ?>
            <div class="logo-main"><?php bloginfo('name'); ?></div>
            <div class="logo-sub"><?php echo esc_html(get_theme_mod('logo_subtitle', 'NAIROBI')); ?></div>
          <?php endif; ?>
        </a>
      </div>
      <?php
      wp_nav_menu(array(
          'theme_location' => 'primary-menu-right',
          'container'      => 'nav',
          'container_class'=> 'nav-links right',
          'menu_class'     => 'nav-menu-right',
          'fallback_cb'    => false,
          'depth'          => 1,
      ));
      ?>
    </div>
    <?php
    // Combined mobile panel: primary-menu theme location covers the full menu for small screens
    wp_nav_menu(array(
        'theme_location' => 'primary-menu',
        'container'      => 'nav',
        'container_class'=> 'mobile-nav-panel',
        'container_id'   => 'mobileNavPanel',
        'menu_class'     => 'mobile-nav-menu',
        'fallback_cb'    => false,
        'depth'          => 1,
    ));
    ?>
  </header>
