import type { ComponentConfig } from '@puckeditor/core';
import Map from '~/components/Map';

export type MapBlockProps = {
  latitude: number;
  longitude: number;
};

export const MapBlock: ComponentConfig<MapBlockProps> = {
  label: 'Kaart',
  fields: {
    latitude: {
      label: 'Breedtegraad',
      type: 'number',
    },
    longitude: {
      label: 'Lengtegraad',
      type: 'number',
    },
  },
  defaultProps: {
    latitude: 51.4269171,
    longitude: 5.4864656,
  },
  render({ latitude, longitude }: MapBlockProps) {
    return <Map coordinates={[latitude, longitude]} />;
  },
};
