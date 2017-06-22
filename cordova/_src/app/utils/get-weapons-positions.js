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