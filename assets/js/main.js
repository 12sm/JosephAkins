/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can 
 * always reference jQuery with $, even when in .noConflict() mode.
 *
 * Google CDN, Latest jQuery
 * To use the default WordPress version of jQuery, go to lib/config.php and
 * remove or comment out: add_theme_support('jquery-cdn');
 * ======================================================================== */

(function($) {

// Use this variable to set up the common and page specific functions. If you 
// rename this variable, you will also need to rename the namespace below.
var Roots = {
  // All pages
  common: {
    init: function() {
      // JavaScript to be fired on all pages
      $('.vid-div').fitVids();
      $(".blog-img-container").imgLiquid
     
  soundManager.setup({
  // disable or enable debug output
  debugMode: true,
  // use HTML5 audio for MP3/MP4, if available
  preferFlash: false,
  useFlashBlock: true,
  // path to directory containing SM2 SWF
  url: '/assets/js',
  // optional: enable MPEG-4/AAC support (requires flash 9)
  flashVersion: 9
  });


soundManager.onready(function() {
  // soundManager.createSound() etc. may now be called
  inlinePlayer = new InlinePlayer();
});    


          }
  },

  // Media page
  media:{
    init: function(){

      $(".gal-thumb").imgLiquid();

    }
  },
  // Home page
  home: {
    init: function() {
      // JavaScript to be fired on the home page
      $('.music-carousel').owlCarousel({
                itemsCustom : [
       [0, 2],
       [480, 3],
       [768, 4],
       [1200, 4],
       [1600, 4]
       ],
       navigation : true,
       navigationText: ['<i class="fa fa-arrow-circle-left fa-3x"></i>','<i class="fa fa-arrow-circle-right fa-3x"></i>'],
       pagination: false,
       scrollPerPage : true
      });
    
   // Setup the player to autoplay the next track
        var a = audiojs.createAll({
          trackEnded: function() {
            var next = $('ol li.playing').next();
            if (!next.length) next = $('ol li').first();
            next.addClass('playing').siblings().removeClass('playing');
            audio.load($('a', next).attr('data-src'));
            audio.play();
          }
        });
        
        // Load in the first track
        var audio = a[0];
            first = $('ol a').attr('data-src');
        $('ol li').first().addClass('playing');
        audio.load(first);
        var newtext = $('li.playing a').text();
	    $('.music-wrapper p.song-title').text(newtext);

        // Load in a track on click
        $('ol li').click(function(e) {
          e.preventDefault();
          $(this).addClass('playing').siblings().removeClass('playing');
          audio.load($('a', this).attr('data-src'));
          audio.play();
        });
        
            $('.next').click(function() {
            	var next = $('li.playing').next();
            	next.click()
            });
            $('.prev').click(function() {
            	var prev = $('li.playing').prev();
            	prev.click()
            });
            
            $('.song-list li').click(function(){
            	var newtext = $('li.playing a').text();
	            $('.music-wrapper p.song-title').text(newtext);
            });
             
    $('.add_to_cart_button').removeClass('button');
    }
  },
  // About us page, note the change from about-us to about_us.
  about_us: {
    init: function() {
      // JavaScript to be fired on the about us page
      $('.attachment-thumbnail').addClass('img-responsive');
      $('.gallery-row').children('.col-sm-3').removeClass('col-sm-3').addClass('col-sm-4');
    }
  },

  single_photos:{
    init: function() {
      // JavaScript to be fired on the about us page
    }
  },

  store:{
init: function() {

$('.music-carousel').owlCarousel({
                itemsCustom : [
       [0, 2],
       [480, 3],
       [768, 3],
       [1200, 3],
       [1600, 4]
       ],
       navigation : true,
       navigationText: ['<i class="fa fa-arrow-circle-left fa-3x"></i>','<i class="fa fa-arrow-circle-right fa-3x"></i>'],
       pagination: false,
       scrollPerPage : true
      });

  $('.add_to_cart_button').removeClass('button');

  $('.pdf-preview').colorbox();

  audiojs.events.ready(function() {
    var as = audiojs.createAll();
  });

         

       
      }
  }
};
// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
var UTIL = {
  fire: function(func, funcname, args) {
    var namespace = Roots;
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
      namespace[func][funcname](args);
    }
  },
  loadEvents: function() {
    UTIL.fire('common');

    $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
      UTIL.fire(classnm);
    });
  }
};

$(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.

