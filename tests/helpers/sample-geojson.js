import locations from './locations';

const chicago = locations.chicago;

export default {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [chicago.lng, chicago.lat]
      },
      properties: {
        name: 'Chicago'
      }
    },

    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [chicago.lng - 0.01, chicago.lat - 0.01],
          [chicago.lng + 0.01, chicago.lat - 0.01],
          [chicago.lng + 0.01, chicago.lat + 0.01],
          [chicago.lng - 0.01, chicago.lat + 0.01],
        ]]
      },
      properties: {
        name: 'A Rectangle'
      }
    }
  ]
};
