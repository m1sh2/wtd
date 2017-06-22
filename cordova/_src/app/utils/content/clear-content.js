import $ from 'jquery';

export const clearContent = () => {
  let $content = $('#content span, #content div');
  $content.remove();
}