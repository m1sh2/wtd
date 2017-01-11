import $ from 'jquery';

export const clearMap = () => {
  let $map = $('#map');
  $map.remove();
}