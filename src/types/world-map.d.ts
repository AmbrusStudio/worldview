export type WorldFeaturesType = {
  geometry: {
    coordinates: any[];
    type: 'Polygon' | 'MultiPolygon';
  };
  properties: object;
  type: 'Feature';
};

export type WorldDataType = {
  features: WorldFeaturesType[];
  type: 'FeatureCollection';
};
