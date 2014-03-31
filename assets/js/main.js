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
    }
  },
  // About us page, note the change from about-us to about_us.
  about_us: {
    init: function() {
      // JavaScript to be fired on the about us page
    }
  },

  store:{
init: function() {

         soundManager.setup({
         url: '/assets/js',
       flashVersion: 9, // optional: shiny features (default = 8)
       // optional: ignore Flash where possible, use 100% HTML5 mode
       // preferFlash: false,
     });
         function BasicMP3Player() {
  var self = this,
      pl = this,
      sm = soundManager, // soundManager instance
      isTouchDevice = (navigator.userAgent.match(/ipad|iphone/i)),
      isIE = (navigator.userAgent.match(/msie/i));
  this.excludeClass = 'button-exclude'; // CSS class for ignoring MP3 links
  this.links = [];
  this.sounds = [];
  this.soundsByURL = {};
  this.indexByURL = {};
  this.lastSound = null;
  this.soundCount = 0;

  this.config = {
    // configuration options
    playNext: false, // stop after one sound, or play through list until end
    autoPlay: false  // start playing the first sound right away
  };

  this.css = {
    // CSS class names appended to link during various states
    sDefault: 'sm2_button', // default state
    sLoading: 'sm2_loading',
    sPlaying: 'sm2_playing',
    sPaused: 'sm2_paused'
  };

  // event + DOM utils

  this.includeClass = this.css.sDefault;

  this.addEventHandler = (typeof window.addEventListener !== 'undefined' ? function(o, evtName, evtHandler) {
    return o.addEventListener(evtName,evtHandler,false);
  } : function(o, evtName, evtHandler) {
    o.attachEvent('on'+evtName,evtHandler);
  });

  this.removeEventHandler = (typeof window.removeEventListener !== 'undefined' ? function(o, evtName, evtHandler) {
    return o.removeEventListener(evtName,evtHandler,false);
  } : function(o, evtName, evtHandler) {
    return o.detachEvent('on'+evtName,evtHandler);
  });

  this.classContains = function(o,cStr) {
    return (typeof(o.className)!=='undefined'?o.className.match(new RegExp('(\\s|^)'+cStr+'(\\s|$)')):false);
  };

  this.addClass = function(o,cStr) {
    if (!o || !cStr || self.classContains(o,cStr)) {
      return false;
    }
    o.className = (o.className?o.className+' ':'')+cStr;
  };

  this.removeClass = function(o,cStr) {
    if (!o || !cStr || !self.classContains(o,cStr)) {
      return false;
    }
    o.className = o.className.replace(new RegExp('( '+cStr+')|('+cStr+')','g'),'');
  };

  this.getSoundByURL = function(sURL) {
    return (typeof self.soundsByURL[sURL] !== 'undefined' ? self.soundsByURL[sURL] : null);
  };

  this.isChildOfNode = function(o,sNodeName) {
    if (!o || !o.parentNode) {
      return false;
    }
    sNodeName = sNodeName.toLowerCase();
    do {
      o = o.parentNode;
    } while (o && o.parentNode && o.nodeName.toLowerCase() !== sNodeName);
    return (o.nodeName.toLowerCase() === sNodeName ? o : null);
  };

  this.events = {

    // handlers for sound events as they're started/stopped/played

    play: function() {
      pl.removeClass(this._data.oLink,this._data.className);
      this._data.className = pl.css.sPlaying;
      pl.addClass(this._data.oLink,this._data.className);
    },

    stop: function() {
      pl.removeClass(this._data.oLink,this._data.className);
      this._data.className = '';
    },

    pause: function() {
      pl.removeClass(this._data.oLink,this._data.className);
      this._data.className = pl.css.sPaused;
      pl.addClass(this._data.oLink,this._data.className);
    },

    resume: function() {
      pl.removeClass(this._data.oLink,this._data.className);
      this._data.className = pl.css.sPlaying;
      pl.addClass(this._data.oLink,this._data.className);      
    },

    finish: function() {
      pl.removeClass(this._data.oLink,this._data.className);
      this._data.className = '';
      if (pl.config.playNext) {
        var nextLink = (pl.indexByURL[this._data.oLink.href]+1);
        if (nextLink<pl.links.length) {
          pl.handleClick({'target':pl.links[nextLink]});
        }
      }
    }

  };

  this.stopEvent = function(e) {
   if (typeof e !== 'undefined' && typeof e.preventDefault !== 'undefined') {
      e.preventDefault();
    } else if (typeof window.event !== 'undefined') {
      window.event.returnValue = false;
    }
    return false;
  };

  this.getTheDamnLink = (isIE) ? function(e) {
    // I really didn't want to have to do this.
    return (e && e.target ? e.target : window.event.srcElement);
  } : function(e) {
    return e.target;
  };

  this.handleClick = function(e) {
    // a sound link was clicked
    if (typeof e.button !== 'undefined' && e.button>1) {
      // ignore right-click
      return true;
    }
    var o = self.getTheDamnLink(e),
        sURL,
        soundURL,
        thisSound;
    if (o.nodeName.toLowerCase() !== 'a') {
      o = self.isChildOfNode(o,'a');
      if (!o) {
        return true;
      }
    }
    sURL = o.getAttribute('href');
    if (!o.href || !soundManager.canPlayLink(o) || self.classContains(o,self.excludeClass)) {
      return true; // pass-thru for non-MP3/non-links
    }
    if (!self.classContains(o,self.includeClass)) {
      return true;
    }
    sm._writeDebug('handleClick()');
    soundURL = (o.href);
    thisSound = self.getSoundByURL(soundURL);
    if (thisSound) {
      // already exists
      if (thisSound === self.lastSound) {
        // and was playing (or paused)
        thisSound.togglePause();
      } else {
        // different sound
        thisSound.togglePause(); // start playing current
        sm._writeDebug('sound different than last sound: '+self.lastSound.id);
        if (self.lastSound) {
          self.stopSound(self.lastSound);
        }
      }
    } else {
      // create sound
      thisSound = sm.createSound({
       id:'basicMP3Sound'+(self.soundCount++),
       url:soundURL,
       onplay:self.events.play,
       onstop:self.events.stop,
       onpause:self.events.pause,
       onresume:self.events.resume,
       onfinish:self.events.finish,
       type:(o.type||null)
      });
      // tack on some custom data
      thisSound._data = {
        oLink: o, // DOM node for reference within SM2 object event handlers
        className: self.css.sPlaying
      };
      self.soundsByURL[soundURL] = thisSound;
      self.sounds.push(thisSound);
      if (self.lastSound) {
        // stop last sound
        self.stopSound(self.lastSound);
      }
      thisSound.play();
    }
    self.lastSound = thisSound; // reference for next call
    return self.stopEvent(e);
  };

  this.stopSound = function(oSound) {
    soundManager.stop(oSound.id);
    if (!isTouchDevice) { // iOS 4.2+ security blocks onfinish() -> playNext() if we set a .src in-between(?)
      soundManager.unload(oSound.id);
    }
  };

  this.init = function() {
    sm._writeDebug('basicMP3Player.init()');
    var i, j,
        foundItems = 0,
        oLinks = document.getElementsByTagName('a');
    // grab all links, look for .mp3
    for (i=0, j=oLinks.length; i<j; i++) {
      if (self.classContains(oLinks[i],self.css.sDefault) && !self.classContains(oLinks[i],self.excludeClass)) {
        // self.addClass(oLinks[i],self.css.sDefault); // add default CSS decoration - good if you're lazy and want ALL MP3/playable links to do this
        self.links[foundItems] = (oLinks[i]);
        self.indexByURL[oLinks[i].href] = foundItems; // hack for indexing
        foundItems++;
      }
    }
    if (foundItems>0) {
      self.addEventHandler(document,'click',self.handleClick);
      if (self.config.autoPlay) {
        self.handleClick({target:self.links[0],preventDefault:function(){}});
      }
    }
    sm._writeDebug('basicMP3Player.init(): Found '+foundItems+' relevant items.');
  };

  this.init();

}

var basicMP3Player = null;

soundManager.setup({
  preferFlash: false,
  onready: function() {
    basicMP3Player = new BasicMP3Player();
  }
});
       
}
}
// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
;var UTIL = {
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

