import $ from 'jquery';

export const addMenu = (o) => {
  console.log(o);

  const menu = $('<div/>');
  const wWin = $(window).width();
  const hWin = $(window).height();
  menu.attr({
    id: 'menu'
  }).addClass('menu');

  const k = wWin / o.wMap;
  const w = wWin;
  const h = o.hMap * k;

  menu.css({
    marginTop: '-' + (h / 2) + 'px'
  });

  o.items.forEach(item => {
    let itemHtml = $('<div/>');
    itemHtml
      .addClass('menu-item')
      .css({
        left: item.x * k + 'px',
        top: item.y * k + 'px',
        width: 40 * k + 'px',
        height: 20 * k + 'px'
      });
    
    if (item.click) {
      itemHtml.click(item.click);
    }
    
    if (item.label) {
      itemHtml.html(item.label);
    }
    
    if (item.cls) {
      itemHtml.addClass(item.cls);
    }

    menu.append(itemHtml);
  });

  // if (o.click) {
  //   map.click(o.click);
  // }

  $('#buttons').append(menu);
}
