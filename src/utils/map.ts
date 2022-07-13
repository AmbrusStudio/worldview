import { planeHeight, planeWidth } from '../constants';

/**
 * Container exceeds map limits
 * @param width
 * @param height
 * @returns
 */
export const isContainerExceedsMapLimits = (
  width: number,
  height: number,
  zoom: number
): boolean => {
  if (width > planeWidth * zoom || height > planeHeight * zoom) {
    return true;
  }
  return false;
};

export const getMapZoom = (width: number, height: number): number => {
  const maxDiameter = planeHeight;
  const widthZoom = width / maxDiameter;
  const heightZoom = height / maxDiameter;

  // console.log(widthZoom, heightZoom);
  return Math.min(widthZoom, heightZoom);
};
