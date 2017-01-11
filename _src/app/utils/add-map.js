import $ from 'jquery';

export const addMap = (o) => {
  console.log(o);
  const map = $('<div/>');
  const wWin = $(window).width();
  const hWin = $(window).height();
  map.attr({
    id: 'map'
  });

  const k = wWin / o.wMap;
  const w = wWin;
  const h = o.hMap * k;

  map.css({
    width: w + 'px',
    height: h + 'px',
    top: '50%',
    marginTop: '-' + (h / 2) + 'px'
  });

  o.items.forEach(item => {
    let itemHtml = $('<div/>');
    itemHtml
      .addClass('map-item')
      .css({
        left: item.x * k + 'px',
        top: item.y * k + 'px',
        width: 40 * k + 'px',
        height: 20 * k + 'px'
      });
    
    if (item.click) {
      itemHtml.click(item.click);
    }

    map.append(itemHtml);
  });

  // if (o.click) {
  //   map.click(o.click);
  // }

  $('#buttons').append(map);
};