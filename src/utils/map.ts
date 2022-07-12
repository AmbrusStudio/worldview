import { planeHeight, planeWidth } from '../constants';

/**
 * Get map zoom by container
 * @param width
 * @param height
 * @returns
 */
export const getMapZoomByContainer = (width: number, height: number): 1 | 2 => {
  let zoom: 1 | 2 = 1;

  if (width > planeWidth[1] || height > planeHeight[1]) {
    zoom = 2;
  }

  return zoom;
};

/**
 * Get map zoom by container
 * @param width
 * @param height
 * @returns
 */
export const getMapSizeByContainer = (width: number, height: number) => {
  const zoom = getMapZoomByContainer(width, height);

  const w = planeWidth[zoom];
  const h = planeHeight[zoom];
  return [w, h];
};
