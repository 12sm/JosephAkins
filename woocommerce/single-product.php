
<div class="row">
	<div class="col-sm-12">
	<?php $postid = get_the_ID(); ?> 
	<?php echo do_shortcode('[wpv-view name="single-product" ids=" '.$postid.' "]') ?>
	</div>
</div>