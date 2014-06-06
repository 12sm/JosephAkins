<?php 

$theshortcode = '[wpv-view name="single-product" ids="'.the_ID().'"]';
echo do_shortcode($theshortcode); 

?>