import $ from 'jquery';

export const addMap = (o) => {
  console.log(o);
  
  o = typeof o === 'undefined' ? {} : o;
  
  const map = $('<div/>');
  const mapBg = $('<div/>');
  const wWin = $(window).width();
  const hWin = $(window).height();
  o.wMap = 2401;
  o.hMap = 1114;

  map.attr({
    id: 'map'
  });

  mapBg.addClass('map-bg');

  const k = wWin / o.wMap;
  const w = wWin;
  const h = o.hMap * k;

  map.append(mapBg);

  o.items.forEach(item => {
    let itemHtml = $('<div/>');
    itemHtml.addClass('map-item');
    
    if (item.hasOwnProperty('label')) {
      itemHtml.append('<div class="map-item-label">' + item.label + '</div>');
    }
    
    if (item.hasOwnProperty('progress')) {
      let progress = $('<div/>');
      progress.addClass('map-item-progress')
        .html(item.progress + '%');
      
      if (item.progress <= 0) {
        progress.addClass('no-progress');
      } else if (item.progress > 0 && item.progress < 100) {
        progress.addClass('in-progress');
      } else if (item.progress >= 100) {
        progress.addClass('complete');
      }
      itemHtml.append(progress);
    }
    
    // if (item.hasOwnProperty('click')) {
    //   itemHtml.click(item.click);
    // }

    itemHtml.click(e => {
      e.preventDefault();
      $('.map-item').addClass('hidden');
      itemHtml.addClass('opened');
    });
    
    if (item.hasOwnProperty('closed') && item.closed) {
      itemHtml.addClass('item-closed');
      itemHtml.append('<span class="icon-lock"></span>');
    }

    item.subItems.forEach(subItem => {
      let subItemHtml = $('<div/>');
      subItemHtml.addClass('map-subitem');
      
      if (subItem.hasOwnProperty('label')) {
        subItemHtml.append('<div class="map-subitem-label">' + subItem.label + '</div>');
      }
      
      if (subItem.hasOwnProperty('progress')) {
        let progress = $('<div/>');
        progress.addClass('map-subitem-progress');
        
        if (subItem.progress <= 0) {
          progress.addClass('no-progress');
          progress.html('⨉');
        } else if (subItem.progress > 0 && subItem.progress < 100) {
          progress.addClass('in-progress');
          progress.html('⚔');
        } else if (subItem.progress >= 100) {
          progress.addClass('complete');
          progress.html('✓');
        }
        subItemHtml.append(progress);
      }
      
      if (subItem.hasOwnProperty('click')) {
        subItemHtml.click(subItem.click);
      }

      if (subItem.hasOwnProperty('closed') && subItem.closed) {
        subItemHtml.addClass('item-closed');
        subItemHtml.append('<span class="icon-lock"></span>');
      }

      itemHtml.append(subItemHtml);
    });

    map.append(itemHtml);
  });

  if (o.hasOwnProperty('hidden') && o.hidden) {
    map.hide();
  }

  // if (o.click) {
  //   map.click(o.click);
  // }

  $('#buttons').append(map);

  return map
};