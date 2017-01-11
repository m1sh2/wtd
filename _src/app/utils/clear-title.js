import $ from 'jquery';

export const clearTitles = () => {
  let $titles = $('.title');
  $titles.remove();
}