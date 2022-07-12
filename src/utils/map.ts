import * as THREE from 'three';

import { planeHeight, planeWidth } from '../constants';
import { NumberArray, WorldFeaturesType } from '../types/index.d';

/**
 * draw Extrude Shape
 * @param polygon
 * @returns
 */
export const drawExtrudeShape = (polygon: NumberArray[]): THREE.Shape => {
  const shape = new THREE.Shape();
  polygon.forEach((p, index) => {
    if (index === 0) {
      shape.moveTo(p[0], p[1]);
    }
    shape.lineTo(p[0], p[1]);
  });

  return shape;
};

/**
 * World Data To Shapes
 * @param data
 * @returns
 */
export const worldDataToShapes = (data: WorldFeaturesType[]) => {
  return data.flatMap((feature) => {
    const paths: {
      shape: THREE.Shape;
      color: string;
      fillOpacity: number;
    }[] = [];

    if (feature.geometry.type === 'MultiPolygon') {
      feature.geometry.coordinates.forEach((points) => {
        points.forEach((p: any[]) => {
          paths.push({
            shape: drawExtrudeShape(p),
            color: '#2196f3',
            fillOpacity: 1,
          });
        });
      });
    }

    if (feature.geometry.type === 'Polygon') {
      feature.geometry.coordinates.forEach((p) => {
        paths.push({
          shape: drawExtrudeShape(p),
          color: '#2196f3',
          fillOpacity: 1,
        });
      });
    }

    return paths;
  });
};

/**
 * Get map zoom by container
 * @param width
 * @param height
 * @returns
 */
export const getMapZoomByContainer = (width: number, height: number) => {
  let zoom: 1 | 2 = 1;

  if (width > planeWidth[1] || height > planeHeight[1]) {
    zoom = 2;
  }

  const w = planeWidth[zoom];
  const h = planeHeight[zoom];
  return [w, h];
};
