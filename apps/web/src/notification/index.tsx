import { AnimatePresence, motion } from '@repo/ui/lib';
import { X } from 'lucide-react';
import { useState } from 'react';

import styles from './index.module.css';

export interface NotificationProps {
  title?: string;
  children: React.ReactNode;
}

export const Notification: React.FC<NotificationProps> = ({ children, title = 'Notification' }) => {
  const [isVisible, setIsVisible] = useState(true);

  const { NODE_ENV } = process.env;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          className={`
          ${styles.notificationTopRightCorner} ${NODE_ENV === 'development' ? 'right-16' : 'right-4'}
    `}
        >
          <div className={styles.notificationBody} role="alert">
            <div className={styles.notificationBodyFlex}>
              <div>
                <p className={styles.title}>{title}</p>
                <div className={styles.message}>{children}</div>
              </div>
              <button onClick={() => setIsVisible(false)} className={styles.closeButton}>
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
