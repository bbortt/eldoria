'use client';

import { X } from 'lucide-react';

import { removeNotification } from '@/notification/notifications';

import styles from './notification.module.css';

export interface NotificationProps {
  index: number;
  title?: string;
  children: React.ReactNode;
}

export const Notification: React.FC<NotificationProps> = ({ children, index, title = 'Notification' }) => {
  return (
    <div className={styles.notificationContainer} role="alert">
      <div className={styles.notificationBody}>
        <div>
          <p className={styles.title}>{title}</p>
          <div className={styles.message}>{children}</div>
        </div>
        <button onClick={() => removeNotification(index)} className={styles.closeButton}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
