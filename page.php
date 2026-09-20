<?php
/**
 * Default Static Page Template — Living Nairobi
 * Used for About, Terms, Privacy and other standard static pages.
 */
get_header();
?>

<main class="site-main page-content-container">
  <div class="wrap">
    <div class="page-content">

      <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

        <header>
          <div class="eyebrow">Living Nairobi</div>
          <h1 class="page-title"><?php the_title(); ?></h1>
        </header>

        <div class="page-body">
          <?php the_content(); ?>
        </div>

        <?php if ( comments_open() || get_comments_number() ) : ?>
          <?php comments_template(); ?>
        <?php endif; ?>

      <?php endwhile; endif; ?>

    </div>
  </div>
</main>

<?php get_footer(); ?>
