import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { removeNotification } from '@/notification/notifications';

import { Notification } from './notification';

jest.mock('@/notification/notifications', () => ({
  removeNotification: jest.fn(),
}));

describe('Notification', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default title', () => {
    render(<Notification index={0}>Test message</Notification>);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Notification')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    render(
      <Notification index={0} title="Custom Title">
        Test message
      </Notification>,
    );

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('calls removeNotification with correct index when close button is clicked', async () => {
    const user = userEvent.setup();
    const testIndex = 2;

    render(<Notification index={testIndex}>Test message</Notification>);

    const closeButton = screen.getByRole('button');
    await user.click(closeButton);

    expect(removeNotification).toHaveBeenCalledWith(testIndex);
  });

  it('renders with children', () => {
    render(
      <Notification index={0}>
        <div data-testid="custom-child">Child Element</div>
      </Notification>,
    );

    expect(screen.getByTestId('custom-child')).toBeInTheDocument();
  });
});
