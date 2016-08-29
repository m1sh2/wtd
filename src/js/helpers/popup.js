'use strict';

(function(wtd, win, doc, $){
  wtd.popup = function(msg){
    var a = $('<div/>');
    var bg = $('<div/>');
    var cnt = $('<div/>');
    var close = $('<button/>');
    
    a.addClass('popup');
    bg.addClass('popup-bg');
    cnt.addClass('popup-cnt');
    close.addClass('close');

    close.html('Close');

    close.click(function(){
      a.remove();
    });

    if(msg.hasOwnProperty('type')){
      cnt.addClass(msg.type);
      if(msg.type==='game-over'
        || msg.type==='game-victory'
      ){
        close.click(function(){
          wtd.getDefault();
          wtd.newStart();
          a.remove();
        });
      }
    }
    cnt.html(msg.msg);

    if(!!msg.title){
      cnt.prepend('<h1>'+msg.title+'</h1>');
    }
    cnt.append(close);
    
    a.append(bg);
    a.append(cnt);
    $('body').append(a);
  }
})(WTD, window, document, jQuery)













