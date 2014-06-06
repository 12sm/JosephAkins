<?php 

$postid = get_the_ID();
$theshortcode = '[wpv-view name="single-product" ids="'.$postid.'"]';
echo do_shortcode($theshortcode); 
echo $theshortcode;
echo $postid;

?>