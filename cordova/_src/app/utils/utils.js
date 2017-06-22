import { addButton, clearButtons } from './buttons/';
import { addContent, clearContent } from './content/';

import { addMap } from './map/add-map';
import { removeMap } from './map/remove-map';

import { addTitle } from './title/add-title';
import { removeTitles } from './title/remove-titles';

import { addMenu } from './menu/add-menu';
import { removeMenu } from './menu/remove-menu';

import { getRatio } from './get-ratio';
import { getView } from './get-view';
import { getWeaponsPositions } from './get-weapons-positions';
import { getRadians } from './get-radians';

import { setCenter } from './set-center';
import { setResponsiveWidth } from './set-responsive-width';

import { hasChildren } from './has-children';
import { getStorage, setStorage } from './storage';

export const U = {
  btns: {
    add: addButton,
    clear: clearButtons
  },

  cnt: {
    add: addContent,
    clear: clearContent
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

  mem: {
    get: getStorage,
    set: setStorage
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