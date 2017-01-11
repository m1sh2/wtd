import $ from 'jquery';

export const addTitle = (options) => {
  const title = $('<div/>');
  title.attr({
    id: 'title'
  });

  title.addClass('title');

  if (options.title) {
    title.html(options.title);
  }

  $('#content').append(title);
};