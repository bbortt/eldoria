import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Notification } from './index';

jest.mock('@repo/ui/lib', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('Notification', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('renders with default title', () => {
    render(<Notification>Test message</Notification>);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Notification')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    render(<Notification title="Custom Title">Test message</Notification>);

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('handles close button click', async () => {
    const user = userEvent.setup();

    render(<Notification>Test message</Notification>);

    const closeButton = screen.getByRole('button');
    await user.click(closeButton);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });

  it('renders with correct position in development environment', () => {
    process.env.NODE_ENV = 'development';

    render(<Notification>Test message</Notification>);

    const notificationElement = screen.getByRole('alert').parentElement;
    expect(notificationElement).toHaveClass('right-16');
  });

  it('renders with correct position in production environment', () => {
    process.env.NODE_ENV = 'production';

    render(<Notification>Test message</Notification>);

    const notificationElement = screen.getByRole('alert').parentElement;
    expect(notificationElement).toHaveClass('right-4');
  });

  it('renders with children as ReactNode', () => {
    render(
      <Notification>
        <div data-testid="custom-child">
          <span>Child Element</span>
        </div>
      </Notification>,
    );

    expect(screen.getByTestId('custom-child')).toBeInTheDocument();
    expect(screen.getByText('Child Element')).toBeInTheDocument();
  });
});
