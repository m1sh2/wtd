import $ from 'jquery';

export const addContent = (content, options) => {
  content = typeof content === 'undefined' ? '' : content;
  options = typeof options === 'undefined' ? {} : options;

  let _options = {
    type: 'div',
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    cls: '',
    hidden: false
  };

  for (let option in _options) {
    if (options.hasOwnProperty(option)) {
      _options[option] = options[option];
    }
  }

  let $content = $('#content');
  let $element = $('<' + _options.type + '/>');

  if (content) {
    $element.html(content);
  }

  $element.addClass('content-element');

  if (_options.x) { $element.css({left: _options.x + 'px'}); }
  if (_options.y) { $element.css({top: _options.y + 'px'}); }
  if (_options.w) { $element.css({width: _options.w + 'px'}); }
  if (_options.h) {
    $element.css({
      height: _options.h + 'px',
      lineHeight: _options.h + 'px'
    });
  }
  
  if (_options.cls) {
    $element.addClass(_options.cls);
  }

  if (_options.hidden) {
    $element.hide();
  }

  $content.append($element);

  return $element;
}