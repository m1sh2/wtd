export const setStorage = (name, value) => {
  if (typeof value === 'object') {
    value = 'object_' + JSON.stringify(value);
  }
  localStorage.setItem(name, value);
};

export const getStorage = (name) => {
  let value = localStorage.getItem(name);
  if (value) {
    console.log(value.substr(0, 7));
  }
  
  if (value && value.substr(0, 7) === 'object_') {
    value = JSON.parse(value.substr(7));
  }
  return value;
};