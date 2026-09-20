  <!-- Footer -->
  <footer>
    <div class="footer-wrap">
      <?php
      wp_nav_menu(array(
          'theme_location' => 'footer-menu',
          'container'      => 'div',
          'container_class'=> 'footer-links',
          'menu_class'     => 'footer-menu',
          'fallback_cb'    => false,
          'depth'          => 1,
      ));
      ?>
      <div class="footer-copy">&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All Rights Reserved.</div>
    </div>
  </footer>

<?php wp_footer(); ?>
</body>
</html>
