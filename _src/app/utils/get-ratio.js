const maxScaleRatio = 4;
const scaleRatio = window.devicePixelRatio; // window.devicePixelRatio
const scaleRatioSprite = scaleRatio / maxScaleRatio;

export const getRatio = {
  ratio: scaleRatio,
  sprite: scaleRatioSprite
}