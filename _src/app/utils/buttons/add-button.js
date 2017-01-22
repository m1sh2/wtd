import $ from 'jquery';

export const addButton = (options) => {
  let _options = {
    type: '',
    x: 0,
    y: 0,
    w: 80,
    h: 40,
    label: '',
    click: null,
    cls: '',
    hidden: false
  };

  for (let option in _options) {
    if (options.hasOwnProperty(option)) {
      _options[option] = options[option];
    }
  }

  let $buttons = $('#buttons');
  let $button = $('<span/>');

  $button.addClass('btn');

  $button.css({
    left: _options.x + 'px',
    top: _options.y + 'px',
    width: _options.w + 'px',
    height: _options.h + 'px',
    lineHeight: _options.h + 'px'
  });
  
  if (_options.cls) {
    $button.addClass(_options.cls);
  }

  if (_options.type === 'back') {
    $button.addClass('btn-back');
    $button.addClass('icon-arrow-right');
  }
  
  if (_options.label) {
    $button.html(_options.label);
  }

  if (_options.click) {
    $button.click(_options.click);
  }

  if (_options.hidden) {
    $button.hide();
  }

  $buttons.append($button);

  return $button;
}