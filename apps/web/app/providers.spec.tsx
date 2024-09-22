import { render } from '@testing-library/react';

import { Providers } from './providers';

jest.mock('@repo/ui/providers', () => ({
  AppUIProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="app-ui-provider">{children}</div>,
}));

describe('Providers', () => {
  it('renders AppUIProvider with children', () => {
    const testChild = <div>Test Child</div>;
    const { getByTestId } = render(<Providers>{testChild}</Providers>);

    const appUIProvider = getByTestId('app-ui-provider');
    expect(appUIProvider).toBeInTheDocument();
    expect(appUIProvider).toHaveTextContent('Test Child');
  });
});
