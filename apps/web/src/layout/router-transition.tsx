'use client';

import { AnimatePresence, motion } from '@repo/ui/lib';
import { usePathname } from 'next/navigation';

export interface RouterTransitionProps {
  children: React.ReactNode;
}

export const RouterTransition: React.FC<RouterTransitionProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default RouterTransition;
