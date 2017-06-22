import $ from 'jquery';
import { U } from '../utils';

export const addMap = (levels, ctx) => {
  levels = typeof levels === 'undefined' ? [] : levels;
  
  const map = $('<div/>');
  const mapBg = $('<div/>');
  const wWin = $(window).width();
  const hWin = $(window).height();
  const wMap = 2401;
  const hMap = 1114;

  map.attr({
    id: 'map'
  });

  mapBg.addClass('map-bg');

  const k = wWin / wMap;
  const w = wWin;
  const h = hMap * k;

  map.append(mapBg);

  levels.forEach(level => {
    let $level = $('<div/>');
    $level.addClass('map-level');
    
    if (level.hasOwnProperty('label')) {
      $level.append('<div class="map-level-label">' + level.label + '</div>');
    }

    $level.click(event => {
      event.preventDefault();

      if (!level.locked) {
        $('.map-level').addClass('hidden');
        $level.addClass('opened');
        $('#title').append('<span class="title-suffix"> - ' + level.label + '</span>');
      }
    });

    let progress = 0;

    level.subLevels.forEach(subLevel => {
      let $subLevel = $('<div/>');
      $subLevel.addClass('map-sublevel');
      
      if (subLevel.hasOwnProperty('label')) {
        $subLevel.append('<div class="map-sublevel-label">' + subLevel.label + '</div>');
      }
      
      let $progress = $('<div/>');
      $progress.addClass('map-sublevel-progress');
      
      if (subLevel.complete) {
        $subLevel.addClass('complete');
        $progress.addClass('icon-checkmark');
        progress += 1;
      } else if (subLevel.hasOwnProperty('locked') && subLevel.locked) {
        $subLevel.addClass('locked');
        $progress.addClass('icon-lock');
      } else {
        $progress.addClass('hidden');
      }

      $subLevel.append($progress);
      
      $subLevel.click(event => {
        event.stopPropagation();
        
        if (!subLevel.locked) {
          U.mem.set('level', level.id);
          U.mem.set('subLevel', subLevel.id);
          ctx.state.start('SplashPlay');
        }
      });

      $level.append($subLevel);
    });
    
    progress = Math.round(progress * 100 / level.subLevels.length);
    let $progress = $('<div/>');
    $progress.addClass('map-level-progress');
    
    if (progress > 0 && progress < 100) {
      $level.prepend('<div class="map-level-progress-value"><div class="val">' + progress + '%</div></div>');
      $level.addClass('in-progress');
    } else if (progress >= 100) {
      $progress.addClass('icon-checkmark');
      $level.prepend('<div class="map-level-progress-value"><div class="val">' + progress + '%</div></div>');
    } else if (level.hasOwnProperty('locked') && level.locked) {
      $level.addClass('locked');
      $progress.addClass('icon-lock');
    }
    $level.append($progress);

    map.append($level);
  });

  // if (o.click) {
  //   map.click(o.click);
  // }

  $('#buttons').append(map);

  return map
};