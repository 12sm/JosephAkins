<?php $postid = get_the_ID(); ?> 
<?php echo do_shortcode('[wpv-view name="single-product" ids=" echo $postid "]') ?>
<h1><?php echo $postid ?></h1>