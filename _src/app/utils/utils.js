import { addButton, clearButtons } from './buttons/';
import { addMap } from './add-map';
import { clearMap } from './clear-map';
import { addTitle } from './add-title';
import { clearTitles } from './clear-title';

import { getMenu } from './get-menu';
import { getRatio } from './get-ratio';
import { getView } from './get-view';
import { getWeaponsPositions } from './get-weapons-positions';

import { setCenter } from './set-center';
import { setResponsiveWidth } from './set-responsive-width';

export const U = {
  btns: {
    add: addButton,
    clear: clearButtons
  },

  map: {
    add: addMap,
    clear: clearMap
  },

  title: {
    add: addTitle,
    clear: clearTitles
  },

  getMenu,
  ratio: getRatio.ratio,
  ratioS: getRatio.sprite,
  view: getView,
  getWeaponsPositions,

  setCenter,
  setResponsiveWidth
}