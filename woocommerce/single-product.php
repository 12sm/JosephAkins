<?php $postid = get_the_ID(); ?> 
<h1>TEST its in single-product.php</h1>
<?php echo do_shortcode('[wpv-view name="single-product" ids=" '.$postid.' "]') ?>