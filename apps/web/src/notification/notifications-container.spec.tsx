import { act, render, screen } from '@testing-library/react';

import type { NotificationType } from '@/notification';
import { subscribeToNotificationUpdates } from '@/notification';

import { NotificationsContainer } from './notifications-container';

jest.mock('@/notification', () => ({
  subscribeToNotificationUpdates: jest.fn(),
}));

jest.mock('@repo/ui/lib', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  },
}));

describe('NotificationContainer', () => {
  let originalEnv: NodeJS.ProcessEnv;
  let mockPublishCallback: (notifications: NotificationType[]) => void;

  beforeEach(() => {
    originalEnv = { ...process.env };
    mockPublishCallback = jest.fn();
    (subscribeToNotificationUpdates as jest.Mock).mockImplementation(({ publish }) => {
      mockPublishCallback = publish;
    });
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.clearAllMocks();
  });

  it('renders without notifications initially', () => {
    render(<NotificationsContainer />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('subscribes to notification updates on mount', () => {
    render(<NotificationsContainer />);
    expect(subscribeToNotificationUpdates).toHaveBeenCalledTimes(1);
    expect(subscribeToNotificationUpdates).toHaveBeenCalledWith(
      expect.objectContaining({
        publish: expect.any(Function),
      }),
    );
  });

  it('updates notifications when new ones are published', () => {
    render(<NotificationsContainer />);

    // Initial notifications
    act(() => mockPublishCallback([{ title: 'Test 1', body: 'Message 1' }]));
    expect(screen.getByText('Test 1')).toBeInTheDocument();

    // Update notifications
    act(() =>
      mockPublishCallback([
        { title: 'Test 1', body: 'Message 1' },
        { title: 'Test 2', body: 'Message 2' },
      ]),
    );

    expect(screen.getByText('Test 1')).toBeInTheDocument();
    expect(screen.getByText('Test 2')).toBeInTheDocument();
  });

  it('renders with correct position class in development environment', () => {
    process.env.NODE_ENV = 'development';
    render(<NotificationsContainer />);

    const container = screen.getByTestId('notifications-container');
    expect(container.className).toContain('right-16');
  });

  it('renders with correct position class in production environment', () => {
    process.env.NODE_ENV = 'production';
    render(<NotificationsContainer />);

    const container = screen.getByTestId('notifications-container');
    expect(container.className).toContain('right-4');
  });
});
