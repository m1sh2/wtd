'use strict';

var WTD = {};

(function(wtd, win, doc, $){
  win.addEventListener('load', function(){
    //snd.shot.play();
    //var audio = document.getElementById('audio');
    //audio.play();
    wtd.setDefault();
    // wtd.debug();

    wtd.ctx.canvas.width = wtd.sets.w;
    wtd.ctx.canvas.height = wtd.sets.h;
    // $(doc).click(function(e){
    //   var debug = [];
    //   var x = e.pageX;
    //   var y = e.pageY;
    //   $('.wpn-sel-props').remove();
    //   wtd.drClear();
    //   wtd.drBase();
    //   debug.push('clickPos-'+x+':'+y);
    //   for(var i=0;i<wtd.CLICK.length;i++){
    //     var cl = wtd.CLICK[i];
        
    //     if(x<=cl.x+cl.w
    //       && x>=cl.x-cl.w
    //       && y<=cl.y+cl.h
    //       && y>=cl.y-cl.h
    //     ){
    //       debug.push(cl.type);
    //       switch(cl.type){
    //         case 'wpnPos':
    //           wtd.CLICK = wtd.CLICK.filter(function(c){
    //             return c.type!=='selWpn';
    //           });
    //           wtd.drAddWeapons(x,y);
    //           break;
    //         case 'selWpn':
    //           debug.push(cl.wpnType);
    //           wtd.saveWpn(cl.wpnType,cl.pos);
    //           break;
    //       }
    //     }
        
        
    //   }
    //   //ctx.isPointInPath(20,50)
    //   wtd.debug(debug);
      
      
    // });

    wtd.newStart();
  }, false);

})(WTD, window, document, jQuery)























