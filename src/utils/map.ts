import { planeHeight, planeWidth } from '../constants'

/**
 * Container exceeds map limits
 * @param width
 * @param height
 * @returns
 */
export const isContainerExceedsMapLimits = (width: number, height: number, zoom: number): boolean => {
  if (width > planeWidth * zoom || height > planeHeight * zoom) {
    return true
  }
  return false
}

/**
 * get Map Zoom
 * @param width
 * @param height
 * @returns
 */
export const getMapZoom = (width: number, height: number): number => {
  return height / planeHeight
}
