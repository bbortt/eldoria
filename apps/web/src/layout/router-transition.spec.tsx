import { AnimatePresence } from '@repo/ui/lib';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

import RouterTransition from './router-transition';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock @repo/ui/lib
jest.mock('@repo/ui/lib', () => ({
  AnimatePresence: jest.fn(({ children }) => children),
  motion: {
    div: jest.fn(({ children, ...props }) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    )),
  },
}));

describe('RouterTransition', () => {
  const mockPathname = '/test-path';

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders children', () => {
    render(
      <RouterTransition>
        <div data-testid="child-content">Test Content</div>
      </RouterTransition>,
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('uses current pathname as motion.div key', () => {
    render(
      <RouterTransition>
        <div>Test Content</div>
      </RouterTransition>,
    );

    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toHaveAttribute('key', mockPathname);
  });

  it('sets correct animation properties', () => {
    render(
      <RouterTransition>
        <div>Test Content</div>
      </RouterTransition>,
    );

    const motionDiv = screen.getByTestId('motion-div');

    expect(motionDiv).toHaveAttribute('initial', expect.stringContaining('opacity":0'));
    expect(motionDiv).toHaveAttribute('animate', expect.stringContaining('opacity":1'));
    expect(motionDiv).toHaveAttribute('exit', expect.stringContaining('opacity":0'));
    expect(motionDiv).toHaveAttribute('transition', expect.stringContaining('duration":0.3'));
  });

  it('wraps content in AnimatePresence with wait mode', () => {
    render(
      <RouterTransition>
        <div>Test Content</div>
      </RouterTransition>,
    );

    expect(AnimatePresence).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: 'wait',
      }),
      expect.any(Object),
    );
  });

  it('updates when pathname changes', () => {
    const { rerender } = render(
      <RouterTransition>
        <div>Test Content</div>
      </RouterTransition>,
    );

    // Change pathname
    const newPathname = '/new-path';
    (usePathname as jest.Mock).mockReturnValue(newPathname);

    rerender(
      <RouterTransition>
        <div>Test Content</div>
      </RouterTransition>,
    );

    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toHaveAttribute('key', newPathname);
  });

  it('maintains animation settings across rerenders', () => {
    const { rerender } = render(
      <RouterTransition>
        <div>Initial Content</div>
      </RouterTransition>,
    );

    // Rerender with different content
    rerender(
      <RouterTransition>
        <div>Updated Content</div>
      </RouterTransition>,
    );

    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toHaveAttribute('initial', expect.stringContaining('opacity":0'));
    expect(motionDiv).toHaveAttribute('animate', expect.stringContaining('opacity":1'));
    expect(motionDiv).toHaveAttribute('exit', expect.stringContaining('opacity":0'));
    expect(motionDiv).toHaveAttribute('transition', expect.stringContaining('duration":0.3'));
  });
});
