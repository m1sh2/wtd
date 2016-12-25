
export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}

export const setResponsiveWidth = (sprite, percent, parent) => {
  let percentWidth = (sprite.texture.width - (parent.width / (100 / percent))) * 100 / sprite.texture.width
  sprite.width = parent.width / (100 / percent)
  sprite.height = sprite.texture.height - (sprite.texture.height * percentWidth / 100)
}

export const getWeaponsPositions = () => {
  const widthAttack = 630 * scaleRatio;
  let distance8 = widthAttack / 9;
  let positions = [];
  // positions.push({
  //   x: distance8 * ratio,
  //   y: 0
  // });

  for (let i = 0; i < 8; i++) {
    let x = distance8 + i * distance8 + (this.width / 2 - widthAttack / 2);
    let y = 0;
    let position = {
      x: x,
      y: y
    };
    positions.push(position);
  }

  // for (let i = 0; i < 7; i++) {
  //   let x = distance8 * 1.5 + i * distance8;
  //   let y = 50 * ratio;
  //   let position = {
  //     x: x,
  //     y: y
  //   };
  //   positions.push(position);
  // }

  return positions;
}

const maxScaleRatio = 4;
export const scaleRatio = window.devicePixelRatio; // window.devicePixelRatio
export const scaleRatioSprite = scaleRatio / maxScaleRatio;

export const widthView = document.documentElement.clientWidth;
export const heightView = document.documentElement.clientHeight;

