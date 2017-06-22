import $ from 'jquery';

export const hasChildren = (element, childName) => {
  const isHasChildren = $(element).find($(childName));

  return isHasChildren.length > 0 ? true : false
};