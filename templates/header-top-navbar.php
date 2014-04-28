<!--LayerSlider begin-->
<?php

if ( is_front_page() || is_page('store')) {    
    
    layerslider(1);
    } ?>
    <!--LayerSlider end-->
<header class="banner navbar navbar-default navbar-static-top" role="banner">
  <div class="container-fluid nav-container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="<?php echo home_url(); ?>/"><?php bloginfo('name'); ?></a>
    </div>

    <nav class="collapse navbar-collapse" role="navigation">
      <div class="row">
        <div class="nav-menu-container">
      <?php
        if (has_nav_menu('primary_navigation')) :
          wp_nav_menu(array('theme_location' => 'primary_navigation', 'menu_class' => 'nav navbar-nav'));
        endif;
      ?>
      </div>
      <div class="nav-mail">
          <!-- Begin MailChimp Signup Form -->
<link href="//cdn-images.mailchimp.com/embedcode/slim-081711.css" rel="stylesheet" type="text/css">
<style type="text/css">
  #mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }
  /* Add your own MailChimp form style overrides in your site stylesheet or in this style block.
     We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
</style>
<div id="mc_embed_signup">
<form action="http://josephakins.us5.list-manage1.com/subscribe/post?u=8b7a3df44619bc2357a4d438f&amp;id=3d9589012f" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
  <label for="mce-EMAIL">JOIN THE MAILING LIST</label>
  <div class="input-container"><input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>
  <input type="submit" value="Signup" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;"><input type="text" name="b_8b7a3df44619bc2357a4d438f_3d9589012f" value=""></div>
  
</form>
</div>
<!--End mc_embed_signup-->
</div>
    </nav>
  </div>
</header>