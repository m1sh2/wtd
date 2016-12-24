'use strict';
// Weapon

(function(wtd, win, doc, $){
  wtd.saveWpn = function(type,pos){
    
    if(wtd.sets.money-wtd.wpns[type].cost>=0){
      wtd.sets.money = wtd.sets.money-wtd.wpns[type].cost;
      wtd.BASE.wpns.forEach(function(wp){
        if(wp.pos===pos){
          wtd.WPOS['p'+wp.pos] = type;
        }
      });
      wtd.wpnsCurrent = wtd.getWpns();
      wtd.drClear();
      wtd.drBase();
    }else{
      
    }
  }

  wtd.getWpns = function(){
    //var baseCurrent = base.lvls[base.lvl];
    //var wpnsBase = wpos;
    var wpnsCurrentTmp = [];
    
    for(var i in wtd.WPOS){
      if(!!wtd.WPOS[i]){
        var wpn = Object.assign({},wtd.wpns[wtd.WPOS[i]]);
        var pos = wtd.BASE.wpns.filter(function(p){
          return p.pos==i.replace('p','');
        })[0];
        
        wpn.x = pos.x;
        wpn.y = pos.y;

        var shot = new Audio('./audio/shot.wav');
        shot.play();
        // shot.pause();
        
        shot.volume = 0;
        
        // if(!shot.paused){
          setTimeout(function(){
            shot.pause();
            shot.volume = 0.3;
          },100);
        // }else{
          // shot.volume = 0.3;
        // }
        wpn.snd = shot;
        wpnsCurrentTmp.push(wpn);
      }
      
      //drWeapon(wpn);
    }
    
    return wpnsCurrentTmp;
  }

  wtd.selectWpn = function(cntPos,pos){
    var cnt = $('<div/>');
    var cntBg = $('<div/>');
    cnt.attr('id','cnt');

    cntBg
      .addClass('cnt-bg')
      .click(function(){
        cntBg.remove();
        cnt.remove();
      });
    
    // for(var i=0;i<wtd.BASE.wpns.length;i++){
    //   var posBase = wtd.BASE.wpns[i];
    //   var selWpn = $('<select/>');
    //   selWpn.attr('id','pos'+posBase.pos);
      
    //   var optWpn = $('<option/>');
    //   optWpn
    //     .val(-1)
    //     .html('no weapon');
      
    //   selWpn.append(optWpn);
      
      for(var j in wtd.wpns){
        var wpn = wtd.wpns[j];

        var optWpn = $('<div/>');
        
        var damage = wpn.damage/wtd.max.damage*100;
        if(damage>100){damage = 100;}
        else if(damage<0){damage = 0;}

        var range = wpn.r/wtd.max.r*100;
        if(range>100){range = 100;}
        else if(range<0){range = 0;}
        
        var timer = (1000/wpn.timer)/(1000/wtd.max.timer)*100;
        if(timer>100){timer = 100;}
        else if(timer<0){timer = 0;}

        optWpn
          .addClass('sel-wpn')
          .data('type',j)
          .html(
            '<img class="preview" src="img/'+wpn.img+'">'
            +'<div class="stats">'
              +'<div class="stat">'
                +'<img src="img/icon-damage.svg" class="icon">'
                +'<div class="stat-max">'
                  +'<div class="stat-current" style="width:'+damage+'%;"></div>'
                +'</div>'
              +'</div>'
              +'<div class="stat">'
                +'<img src="img/icon-range.svg" class="icon">'
                +'<div class="stat-max">'
                  +'<div class="stat-current" style="width:'+range+'%;"></div>'
                +'</div>'
              +'</div>'
              +'<div class="stat">'
                +'<img src="img/icon-fire-rate.svg" class="icon">'
                +'<div class="stat-max">'
                  +'<div class="stat-current" style="width:'+timer+'%;"></div>'
                +'</div>'
              +'</div>'
              +'<div class="stat">'
                +'⛃ '+wpn.cost
              +'</div>'
            +'</div>'
          )
          .click(function(){
            wtd.sets.money = wtd.sets.money-wpn.cost;
            wtd.WPOS['p'+pos.pos] = $(this).data('type');
            wtd.wpnsCurrent = wtd.getWpns();
            wtd.getBase();
            wtd.drClear();
            wtd.drBase();
            cnt.remove();
            cntBg.remove();
          });
        // selWpn.append(optWpn);
        cnt.append(optWpn);
      }
      
    //   if(!!wtd.WPOS['p'+posBase.pos]){
    //     selWpn.val(wtd.WPOS['p'+posBase.pos]);
    //   }
      
    //   var cntLine = $('<div/>');
    //   cntLine.append('position '+posBase.pos+':');
    //   cntLine.append(selWpn);
    //   cnt.append(cntLine);
    // }
    
    var save = $('<button/>');
    save
      .attr('type','button')
      .html('Save')
      .click(function(){
        wtd.BASE.wpns.forEach(function(wp){
          var wpn = $('#pos'+wp.pos).val();
          if(wpn!=-1){
            wtd.WPOS['p'+wp.pos] = wpn;
          }
        });
        wtd.wpnsCurrent = wtd.getWpns();
        cnt.remove();
      });
    // cnt.append(save);
    
    var close = $('<button/>');
    close
      .attr('type','button')
      .html('Close')
      .click(function(){
        cnt.remove();
        cntBg.remove();
      });
    cnt.append(close);

    var arrow = $('<div/>');
    arrow.addClass('arrow');

    cnt.append(arrow);

    $('body').append(cnt);
    var top = cntPos.top-cnt.height();
    if(top<20){top = 20;}
    cnt.css({
      top:top+'px'
    });
    $('body').append(cntBg);
  }

})(WTD, window, document, jQuery)

















