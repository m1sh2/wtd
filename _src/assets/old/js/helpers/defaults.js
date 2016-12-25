'use strict';

(function(wtd, win, doc, $){
  wtd.setDefault = function(){
    wtd.default.base = $.extend({},wtd.base);
    wtd.default.BULL = $.extend([],wtd.BULL);
    wtd.default.bullets = $.extend({},wtd.bullets);
    wtd.default.objs = $.extend([],wtd.objs);
    wtd.default.wave = $.extend({},wtd.wave);
    wtd.default.ENY = $.extend({},wtd.ENY);
    wtd.default.ENYS = $.extend([],wtd.ENYS);
    wtd.default.ww = $.extend({},wtd.ww);
    wtd.default.wh = $.extend({},wtd.wh);
    wtd.default.WPOS = $.extend({},wtd.WPOS);
    wtd.default.wpns = $.extend({},wtd.wpns);
    wtd.default.wpnsCurrent = $.extend([],wtd.wpnsCurrent);
  }

  wtd.getDefault = function(){
    wtd.base = $.extend({},wtd.default.base);
    wtd.BULL = $.extend([],wtd.default.BULL);
    wtd.bullets = $.extend({},wtd.default.bullets);
    wtd.objs = $.extend([],wtd.default.objs);
    wtd.wave = $.extend({},wtd.default.wave);
    wtd.ENY = $.extend({},wtd.default.ENY);
    wtd.ENYS = $.extend([],wtd.default.ENYS);
    wtd.ww = $.extend({},wtd.default.ww);
    wtd.wh = $.extend({},wtd.default.wh);
    wtd.WPOS = $.extend({},wtd.default.WPOS);
    wtd.wpns = $.extend({},wtd.default.wpns);
    wtd.wpnsCurrent = $.extend([],wtd.default.wpnsCurrent);
  }
})(WTD, window, document, jQuery)













