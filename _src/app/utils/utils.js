import { addButton, clearButtons } from './buttons/';

import { addMap } from './add-map';
import { removeMap } from './remove-map';

import { addTitle } from './add-title';
import { removeTitles } from './remove-titles';

import { addMenu } from './add-menu';
import { removeMenu } from './remove-menu';

import { getRatio } from './get-ratio';
import { getView } from './get-view';
import { getWeaponsPositions } from './get-weapons-positions';
import { getRadians } from './get-radians';

import { setCenter } from './set-center';
import { setResponsiveWidth } from './set-responsive-width';

import { hasChildren } from './has-children';

export const U = {
  btns: {
    add: addButton,
    clear: clearButtons
  },

  map: {
    add: addMap,
    remove: removeMap
  },

  title: {
    add: addTitle,
    remove: removeTitles
  },

  menu: {
    add: addMenu,
    remove: removeMenu
  },

  ratio: getRatio.ratio,
  ratioS: getRatio.sprite,
  view: getView,
  getWeaponsPositions,
  getRadians,

  setCenter,
  setResponsiveWidth,

  hasChild: hasChildren
}