<?php
/**
 * Front Page Template — Living Nairobi
 */
get_header();

/**
 * Maps a post's primary category slug to contextual hero CTA copy.
 * Falls back to a generic label for categories without a specific mapping.
 */
function livingnairobi_hero_cta_label($category_slug) {
    $ctas = array(
        'fashion'     => 'View the Edit',
        'style'       => 'View the Edit',
        'dining'      => 'See the List',
        'table'       => 'See the List',
        'travel'      => 'Explore the Guide',
        'city-guide'  => 'Explore the Guide',
        'the-view'    => 'Explore the Guide',
        'culture'     => 'Read the Story',
        'society'     => 'Read the Story',
        'people'      => 'Meet Them',
        'wellness'    => 'Read More',
    );
    return isset($ctas[$category_slug]) ? $ctas[$category_slug] : 'Read More';
}
?>

<!-- Hero -->
<section class="hero" style="padding:0;" id="heroSlider">
  <div class="hero-inner">

    <!-- Left Stage (75%) -->
    <div class="hero-stage">
      <?php
      $hero_query = new WP_Query(array(
          'posts_per_page' => 5,
          'post_status'    => 'publish',
          'ignore_sticky_posts' => true,
      ));
      $hero_index = 0;
      if ($hero_query->have_posts()) :
          while ($hero_query->have_posts()) : $hero_query->the_post();
              $cats = get_the_category();
              $primary_cat = !empty($cats) ? $cats[0] : null;
              $cta_label = $primary_cat ? livingnairobi_hero_cta_label($primary_cat->slug) : 'Read More';
      ?>
      <div class="hero-slide<?php echo $hero_index === 0 ? ' active' : ''; ?>" data-slide="<?php echo esc_attr($hero_index); ?>">
        <?php if (has_post_thumbnail()) : ?>
          <img class="hero-photo" src="<?php echo esc_url(get_the_post_thumbnail_url(get_the_ID(), 'full')); ?>" alt="<?php echo esc_attr(get_the_title()); ?>">
        <?php endif; ?>
        <div class="hero-content">
          <?php if ($primary_cat) : ?>
            <div class="eyebrow"><?php echo esc_html($primary_cat->name); ?></div>
          <?php endif; ?>
          <h1><?php the_title(); ?></h1>
          <div class="hero-rule"></div>
          <p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 24, '…')); ?></p>
          <a href="<?php the_permalink(); ?>" class="hero-cta"><?php echo esc_html($cta_label); ?> <span>&rarr;</span></a>
        </div>
      </div>
      <?php
              $hero_index++;
          endwhile;
      endif;
      wp_reset_postdata();
      ?>

      <div class="hero-controls">
        <div class="hero-dots" id="heroDots">
          <?php for ($i = 0; $i < $hero_index; $i++) : ?>
            <span class="<?php echo $i === 0 ? 'active' : ''; ?>" data-dot="<?php echo esc_attr($i); ?>"><?php echo esc_html(str_pad($i + 1, 2, '0', STR_PAD_LEFT)); ?></span>
          <?php endfor; ?>
        </div>
        <div class="hero-arrows">
          <button aria-label="Previous" id="heroPrev">&larr;</button>
          <button aria-label="Next" id="heroNext">&rarr;</button>
        </div>
      </div>
    </div>

    <!-- Right Sidebar (25%) - "Latest" rail, synced 1:1 with hero stage -->
    <aside class="hero-latest-rail">
      <div class="hero-latest-header">Latest</div>
      <?php
      $latest_query = new WP_Query(array(
          'posts_per_page' => 5,
          'post_status'    => 'publish',
          'ignore_sticky_posts' => true,
      ));
      $rail_index = 0;
      if ($latest_query->have_posts()) :
          while ($latest_query->have_posts()) : $latest_query->the_post();
      ?>
      <div class="hero-nav-item<?php echo $rail_index === 0 ? ' active' : ''; ?>" data-slide="<?php echo esc_attr($rail_index); ?>">
        <span class="hero-nav-index"><?php echo esc_html(str_pad($rail_index + 1, 2, '0', STR_PAD_LEFT)); ?></span>
        <?php if (has_post_thumbnail()) : ?>
        <a href="<?php the_permalink(); ?>" class="thumb">
          <img src="<?php echo esc_url(get_the_post_thumbnail_url(get_the_ID(), 'medium')); ?>" alt="<?php echo esc_attr(get_the_title()); ?>">
        </a>
        <?php endif; ?>
        <div class="hero-nav-text">
          <h4><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
          <div class="date"><?php echo get_the_date(); ?></div>
        </div>
      </div>
      <?php
              $rail_index++;
          endwhile;
      endif;
      wp_reset_postdata();
      ?>
    </aside>

  </div>
</section>

<?php
/**
 * Category Section Blocks (Below the Fold)
 * Each block pulls the 3 latest posts from a dedicated category slug.
 */
$livingnairobi_category_blocks = array(
    'People'    => 'people',
    'Table'     => 'table',
    'Society'   => 'society',
    'The View'  => 'the-view',
);

foreach ($livingnairobi_category_blocks as $block_title => $block_slug) :
    $cat_query = new WP_Query(array(
        'posts_per_page' => 3,
        'category_name'  => $block_slug,
        'post_status'    => 'publish',
        'ignore_sticky_posts' => true,
    ));
    if (!$cat_query->have_posts()) {
        wp_reset_postdata();
        continue;
    }
    $category_obj = get_category_by_slug($block_slug);
    $archive_link = $category_obj ? get_category_link($category_obj->term_id) : '#';
?>
<section class="category-block category-<?php echo esc_attr($block_slug); ?>">
  <div class="wrap">
    <div class="trending-header">
      <h2><?php echo esc_html($block_title); ?></h2>
      <div class="line"></div>
      <a href="<?php echo esc_url($archive_link); ?>" class="view-all">View All &rarr;</a>
    </div>
    <div class="trending-grid">
      <?php while ($cat_query->have_posts()) : $cat_query->the_post(); ?>
        <div class="trend-item">
          <?php if (has_post_thumbnail()) : ?>
          <a href="<?php the_permalink(); ?>" class="thumb">
            <img src="<?php echo esc_url(get_the_post_thumbnail_url(get_the_ID(), 'medium')); ?>" alt="<?php echo esc_attr(get_the_title()); ?>">
          </a>
          <?php endif; ?>
          <div class="cat"><?php echo esc_html($block_title); ?></div>
          <h4><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
          <a href="<?php the_permalink(); ?>" class="read-more">Read More &rarr;</a>
        </div>
      <?php endwhile; ?>
    </div>
  </div>
</section>
<?php
    wp_reset_postdata();
endforeach;
?>

<?php get_footer(); ?>
