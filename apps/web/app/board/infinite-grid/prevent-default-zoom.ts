import { WheelEvent } from 'react';

export const preventDefaultZoom = (wheelEvent: WheelEvent<HTMLDivElement>): void => {
  wheelEvent.preventDefault();
};
