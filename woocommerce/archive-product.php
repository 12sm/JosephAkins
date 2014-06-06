<ul class="nav nav-tabs" id="myTab">
  <li class="active"><a href="#music" data-toggle="tab">Music</a></li>
  <li><a href="#sheet-music" data-toggle="tab">Sheet Music</a></li>
  </ul>
          <div class="tab-content">
  			<div class="tab-pane fade in active" id="music"><?php echo do_shortcode('[wpv-view name="store-music"]'); ?></div>
  			<div class="tab-pane fade" id="sheet-music"><?php echo do_shortcode('[wpv-view name="store-sheet-music"]'); ?></div>