import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

import RouterTransition from './router-transition';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('@repo/ui/lib', () => ({
  AnimatePresence: ({ children, ...props }: { children: React.ReactNode }) => (
    <div data-testid="animate-presence" {...props}>
      {children}
    </div>
  ),
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode }) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}));

describe('RouterTransition', () => {
  const mockPathname = '/test-path';

  beforeEach(() => {
    jest.resetAllMocks();
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
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

  it('sets correct animation properties', () => {
    render(
      <RouterTransition>
        <div>Test Content</div>
      </RouterTransition>,
    );

    const motionDiv = screen.getByTestId('motion-div');

    expect(motionDiv).toHaveAttribute('initial');
    expect(motionDiv).toHaveAttribute('animate');
    expect(motionDiv).toHaveAttribute('exit');
    expect(motionDiv).toHaveAttribute('transition');
  });

  it('wraps content in AnimatePresence with wait mode', () => {
    render(
      <RouterTransition>
        <div>Test Content</div>
      </RouterTransition>,
    );

    const animatePresenceDiv = screen.getByTestId('animate-presence');
    expect(animatePresenceDiv).toHaveAttribute('mode', 'wait');
  });

  it('maintains animation settings across rerenders', () => {
    const { rerender } = render(
      <RouterTransition>
        <div>Initial Content</div>
      </RouterTransition>,
    );

    rerender(
      <RouterTransition>
        <div>Updated Content</div>
      </RouterTransition>,
    );

    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toHaveAttribute('initial');
    expect(motionDiv).toHaveAttribute('animate');
    expect(motionDiv).toHaveAttribute('exit');
    expect(motionDiv).toHaveAttribute('transition');
  });
});
