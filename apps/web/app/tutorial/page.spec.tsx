import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';

import { persistConfiguration } from '@/game/configuration';

import TutorialComponent from './page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/game/configuration', () => ({
  persistConfiguration: jest.fn(),
}));

jest.mock('@repo/ui/components', () => ({
  DefaultButton: ({ children, onPress }) => {
    return <button onClick={onPress}>{children}</button>;
  },
}));

jest.mock('./tutorial.conversation', () => ({
  getTutorialConversation: () => ({
    0: { text: 'Conversation 0', backgroundImage: '/bg0.png' },
    1: { text: 'Conversation 1', backgroundImage: '/bg1.png' },
    2: { text: 'Conversation 2', backgroundImage: '/bg2.png' },
    3: { text: 'Conversation 3', backgroundImage: '/bg3.png' },
    4: { text: 'Enter username', backgroundImage: '/bg4.png' },
    5: { text: 'Welcome, {0}', backgroundImage: '/bg5.png' },
    6: { text: 'Join team 1?', backgroundImage: '/bg6.png', character: { name: 'Char1' } },
    7: { text: 'Join team 2?', backgroundImage: '/bg7.png', character: { name: 'Char2' } },
    8: { text: 'Join team 3?', backgroundImage: '/bg8.png', character: { name: 'Char3' } },
    9: { text: 'Join team 4?', backgroundImage: '/bg9.png', character: { name: 'Char4' } },
    10: { text: 'Join team 5?', backgroundImage: '/bg10.png', character: { name: 'Char5' } },
    11: { text: 'Start game', backgroundImage: '/bg11.png' },
  }),
}));

describe('Tutorial', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('renders initial conversation', () => {
    render(<TutorialComponent />);
    expect(screen.getByText('Conversation 0')).toBeInTheDocument();
  });

  it('is possible to navigate through whole conversation', async () => {
    const user = userEvent.setup();
    render(<TutorialComponent />);

    // Continue to next conversation
    await user.click(screen.getByRole('button', { name: 'Continue' }));
    await waitFor(() => expect(screen.getByText('Conversation 1')).toBeInTheDocument());

    // Navigate to username input
    for (let i = 0; i < 3; i++) {
      await user.click(screen.getByRole('button', { name: 'Continue' }));
    }

    // Input username
    const input = await waitFor(() => {
      const textbox = screen.getByRole('textbox');
      expect(textbox).toBeInTheDocument();
      return textbox;
    });

    const username = 'bbortt';
    await user.type(input, username);

    // Navigate to next page
    await user.click(screen.getByRole('button', { name: 'Continue' }));
    await waitFor(() => expect(screen.getByText(`Welcome, ${username}`)).toBeInTheDocument());

    // Select team
    await user.click(screen.getByRole('button', { name: 'Continue' }));

    // Accept 2
    for (let i = 1; i < 3; i++) {
      await waitFor(() => expect(screen.getByText(`Join team ${i}?`)).toBeInTheDocument());
      await user.click(screen.getByRole('button', { name: 'Accept' }));
    }

    // Refuse 3
    for (let i = 3; i < 6; i++) {
      await waitFor(() => expect(screen.getByText(`Join team ${i}?`)).toBeInTheDocument());
      await user.click(screen.getByRole('button', { name: 'Refuse' }));
    }

    await waitFor(() => expect(screen.getByText('Start game')).toBeInTheDocument());

    // Start game / navigate out of conversation
    await user.click(screen.getByRole('button', { name: 'Continue' }));

    expect(persistConfiguration).toHaveBeenCalledWith({
      username,
      team: [expect.objectContaining({ name: username }), { name: 'Char1' }, { name: 'Char2' }],
      tutorial: true,
      showHints: true,
    });
    expect(mockPush).toHaveBeenCalledWith('/board');
  });
});
