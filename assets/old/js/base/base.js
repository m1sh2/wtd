'use strict';
// Base

(function(wtd, win, doc, $){
  wtd.baseLvl = function(){
    if(wtd.base.lvl<wtd.base.lvls.length-1){
      wtd.base.lvl = wtd.base.lvl + 1;
      wtd.CLICK = wtd.CLICK.filter(function(c){
        return c.type!=='wpnPos';
      });
      wtd.BASE.wpns.forEach(function(wp){
        if(!wtd.WPOS['p'+wp.pos]){
          wtd.WPOS['p'+wp.pos] = '';
        }
        
        wtd.CLICK.push({
          x:wp.x,
          y:wp.y,
          type:'wpnPos',
          w:wtd.baseWpnPos.w/2,
          h:wtd.baseWpnPos.h/2
        });
      });
      //base.life0 = BASE.life;
      //base.life = base.life0;
      wtd.wpnsCurrent = wtd.getWpns();
    }
  }

  wtd.getBase = function(){
    var debug = ['getBase'];
    var baseTmp = Object.assign({},wtd.base.lvls[wtd.base.lvl]);
    baseTmp.x = wtd.base.x;
    baseTmp.y = wtd.base.y;
    baseTmp.w = wtd.base.w;
    baseTmp.h = wtd.base.h;
    baseTmp.life0 = baseTmp.life;
    baseTmp.lvl = wtd.base.lvl;
    debug.push(wtd.base.lvl);
    wtd.debug(debug);
    wtd.BASE = baseTmp;
    $('#wpns .wpn-pos').remove();
    wtd.BASE.wpns.forEach(function(pos){
      var wpnPos = $('<div/>');
      wpnPos
        .addClass('wpn-pos')
        .css({
          left: pos.x-20+'px'
        })
        .click(function(e){
          wtd.selectWpn($(this).offset(),pos);
        });

      if(!!wtd.WPOS['p'+pos.pos]){
        console.info(wtd.WPOS['p'+pos.pos]);
        wpnPos.addClass('occupied')
      }
      $('#wpns').append(wpnPos);
    });


  }

  wtd.getBasePos = function(){
    var wpnsBase = wtd.BASE.wpns;
    var posTmp = [];
    
    for(var i=0;i<wpnsBase.length;i++){
      var wpnBase = wpnsBase[i];
      posTmp.push(wpnBase.pos);
    }
    
    return posTmp;
  }
})(WTD, window, document, jQuery)























