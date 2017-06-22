import $ from 'jquery';

export const addTitle = (options) => {
  options = typeof options === 'undefined' ? {} : options;
  
  const title = $('<div/>');
  title.attr({
    id: 'title'
  });

  title.addClass('title');

  if (options.title) {
    title.html(options.title);
  }

  if (options.cls) {
    title.addClass(options.cls);
  }

  $('#content').append(title);
};