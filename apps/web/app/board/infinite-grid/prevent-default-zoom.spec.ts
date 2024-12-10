import { WheelEvent } from 'react';

import { preventDefaultZoom } from './prevent-default-zoom';

describe('preventDefaultZoom', () => {
  it('should prevent default zoom event', () => {
    const preventDefault = jest.fn();

    preventDefaultZoom({ preventDefault } as unknown as WheelEvent<HTMLDivElement>);

    expect(preventDefault).toHaveBeenCalled();
  });
});
