import { AppUIProvider } from '@repo/ui/providers';

export function Providers({ children }: { children: React.ReactNode }) {
  return <AppUIProvider>{children}</AppUIProvider>;
}
