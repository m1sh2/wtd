export const getButton = (labelText, x, y, callback) => {
  let btn = this.game.add.group();
  let button = this.game.add.button(
    x + 48 * getRatio.ratio,
    y + 16 * getRatio.ratio,
    'button',
    null,
    this,
    2,
    1,
    0
  );
  button.enableBody = true;
  button.anchor.set(0.5);
  // buttonsLayer.add(button);

  let label = this.game.add.text(
    x + 48 * getRatio.ratio,
    y + 16 * getRatio.ratio,
    labelText,
    {
      font: 18 * getRatio.ratio + 'px "Text Me One"',
      fill: '#ffffff',
      align: 'center'
    }
  );
  label.anchor.set(0.5);
  // buttonsLayer.add(label);

  // buttonsLayer.add(btn);

  clickArr.push({
    xMin: x / getRatio.ratio,
    xMax: x / getRatio.ratio + 48 * getRatio.ratio,
    yMin: y / getRatio.ratio,
    yMax: y / getRatio.ratio + 16 * getRatio.ratio,
    callback: callback
  });

  return {
    button,
    label
  }
}