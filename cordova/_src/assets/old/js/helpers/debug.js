'use strict';

(function(wtd, win, doc, $){
  wtd.debug = function(a){

    var result = '';
    if(typeof a==='string'){
      result = a;  
    }else if(typeof a==='object'){
      result = a.join(' ');
    }
    console.info(result);
    // $('#debug').append(arguments.join(' '));
    // var funcs = Object.getOwnPropertyNames(wtd).filter(function (p) {
    //   return typeof wtd[p] === 'function';
    // });

    // for(var i=0;i<funcs.length;i++){
    //   var f = funcs[i];
    //   var _func = wtd[f];
    //   wtd[f] = function(){
    //     console.info(a);
    //     _func.apply(this, arguments);
    //   }
    // }

    // function checkContext(element, index, array) {
    //   console.info(element);
    //   return true;
    // }

    // funcs.every(checkContext);
  }
})(WTD, window, document, jQuery)













