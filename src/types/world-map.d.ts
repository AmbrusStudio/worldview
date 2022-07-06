export type WorldFeaturesType = {
  geometry: {
    coordinates: any[];
    type: 'Polygon' | 'MultiPolygon';
  };
  properties: {};
  type: 'Feature';
};

export type WorldDataType = {
  features: WorldFeaturesType[];
  type: 'FeatureCollection';
};
