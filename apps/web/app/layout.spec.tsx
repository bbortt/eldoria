import { render } from '@testing-library/react';

import RootLayout from './layout';

jest.mock('next/font/local', () => () => ({
  variable: 'mocked-font-variable',
}));

jest.mock('@/layout/router-transition', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="router-transition">{children}</div>,
}));

jest.mock('./providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => <div data-testid="providers">{children}</div>,
}));

describe('Root Layout', () => {
  it('renders correctly', () => {
    const { getByTestId, getByRole } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>,
      { container: document },
    );

    // Check if the html element has the correct lang attribute
    const html = getByRole('document');
    expect(html).toBeInTheDocument();
    expect(html.getAttribute('lang')).toEqual('en');
    expect(html.childElementCount).toEqual(2);

    // Check if the body has the correct class names
    const body = html.children[1];
    expect(body).toHaveClass('mocked-font-variable', 'mocked-font-variable');

    // Check if Providers component is rendered
    expect(getByTestId('providers')).toBeInTheDocument();

    // Check if RouterTransition component is rendered
    expect(getByTestId('router-transition')).toBeInTheDocument();

    // Check if main element is rendered
    const main = getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('main');

    // Check if children are rendered
    expect(main).toHaveTextContent('Test Child');
  });

  it('exports correct metadata', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { metadata } = require('./layout');
    expect(metadata).toEqual({
      title: 'Chronicles of Eldoria',
      description: 'The Shadowed Realm',
    });
  });
});
