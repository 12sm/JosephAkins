<?php 

define( 'UPLOADS', ''.'assets' );

function my_excerpt($atts) {
extract(shortcode_atts(array(
'length' => 20,
'text' => '',
), $atts));
$excerpt_more = apply_filters('excerpt_more', ' ' . '[...]');
$res = wp_trim_words( $text, $length, $excerpt_more );
return $res;
}
add_shortcode('my_excerpt', 'my_excerpt');

?>